import importlib
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

from fastapi.testclient import TestClient

from api import server as server_module
from conf import config as config_module


class MattingEndpointTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(server_module.app)

    def test_accepts_local_file_path(self):
        with tempfile.NamedTemporaryFile(suffix=".png") as tmp_file:
            stub_segmentation = SimpleNamespace(segment_image=lambda _: object())
            with patch.dict(
                sys.modules, {"hub_model": SimpleNamespace(segmentation=stub_segmentation)}
            ), patch.object(server_module, "image_obj_to_base64", return_value="data:image/png;base64,test"):
                response = self.client.post(
                    "/api/ai/matting", json={"image_path": tmp_file.name}
                )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "success")

    def test_accepts_url_input(self):
        stub_segmentation = SimpleNamespace(segment_image=lambda _: object())
        with patch.dict(
            sys.modules, {"hub_model": SimpleNamespace(segmentation=stub_segmentation)}
        ), patch.object(server_module, "image_obj_to_base64", return_value="data:image/png;base64,test"):
            response = self.client.post(
                "/api/ai/matting", json={"image_path": "https://example.com/demo.png"}
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "success")

    def test_accepts_base64_data_url_input(self):
        stub_segmentation = SimpleNamespace(segment_image=lambda _: object())
        with patch.dict(
            sys.modules, {"hub_model": SimpleNamespace(segmentation=stub_segmentation)}
        ), patch.object(server_module, "image_obj_to_base64", return_value="data:image/png;base64,test"):
            response = self.client.post(
                "/api/ai/matting",
                json={"image_path": "data:image/png;base64,ZmFrZQ=="},
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "success")

    def test_invalid_input_returns_422(self):
        response = self.client.post("/api/ai/matting", json={"image_path": "not-a-path"})

        self.assertEqual(response.status_code, 422)

    def test_segmentation_failure_returns_http_500(self):
        stub_segmentation = SimpleNamespace(
            segment_image=lambda _: (_ for _ in ()).throw(RuntimeError("boom"))
        )
        with patch.dict(
            sys.modules, {"hub_model": SimpleNamespace(segmentation=stub_segmentation)}
        ):
            response = self.client.post(
                "/api/ai/matting", json={"image_path": "https://example.com/demo.png"}
            )

        self.assertEqual(response.status_code, 500)
        self.assertEqual(response.json()["detail"], "boom")


class APIServerTests(unittest.TestCase):
    def test_stop_signals_uvicorn_server(self):
        api_server = server_module.APIServer()
        api_server.server = SimpleNamespace(should_exit=False, force_exit=False)
        api_server.server_thread = SimpleNamespace(join=lambda timeout: None)

        api_server.stop()

        self.assertTrue(api_server.server.should_exit)
        self.assertTrue(api_server.server.force_exit)


class ConfigTests(unittest.TestCase):
    def test_initialize_uses_copy_of_default_config(self):
        original_language = config_module.DEFAULT_CONFIG["language"]
        temp_dir = tempfile.TemporaryDirectory()
        self.addCleanup(temp_dir.cleanup)

        test_config = config_module.Config.__new__(config_module.Config)
        test_config.config_path = Path(temp_dir.name) / "config.json"

        with patch.object(config_module.Config, "_instance", None):
            test_config._initialize()
            test_config.save("language", "en-US")

        self.assertEqual(config_module.DEFAULT_CONFIG["language"], original_language)
        self.assertEqual(test_config.get("language"), "en-US")


if __name__ == "__main__":
    unittest.main()
