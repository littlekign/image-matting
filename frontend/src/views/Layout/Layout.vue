<template>
    <div class="flex h-screen w-screen overflow-hidden bg-neutral-50 dark:bg-zinc-950">
        <!-- Sidebar -->
        <Nav />

        <!-- Main Content Wrapper -->
        <div class="flex-grow flex-1 flex flex-col p-2 min-w-0 overflow-hidden">
            <!-- Header (Theme Switcher, etc.) -->
            <Header class="flex-shrink-0" />
            
            <!-- Page Content Area -->
            <main class="flex-grow flex-1 overflow-y-auto overflow-x-hidden min-h-0">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import Header from '@/views/Layout/components/Header.vue'
import Nav from '@/views/Layout/components/Nav.vue'

</script>

<style scoped>
/* 在此处添加任何自定义样式 */
</style>