<template>
    <div class="mb-4 relative">
      <div
        @click="toggleDropdown"
        class="select select-sm select-bordered w-full flex items-center justify-between cursor-pointer h-auto py-1 min-h-9"
      >
        <div class="flex flex-wrap gap-1 bg-transparent w-full">
          <span v-for="item in modelValue" :key="item" class="px-2 bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 py-0.5 rounded text-xs ml-1 flex items-center">
            {{ item }}
            <button @click.stop="removeItem(item)" class="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-bold">&times;</button>
          </span>
          <span v-if="modelValue.length === 0" class="text-zinc-400 dark:text-zinc-500 text-xs ml-2">
            Select items...
          </span>
        </div>
      </div>
      <div v-if="isOpen" class="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-md shadow-lg">
        <div
          v-for="option in options"
          :key="option"
          @click="toggleOption(option)"
          class="px-4 py-2 hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer text-sm text-zinc-800 dark:text-zinc-200 flex items-center"
        >
          <input type="checkbox" :checked="modelValue.includes(option)" class="checkbox checkbox-xs checkbox-primary mr-2">
          {{ option }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      required: true
    }
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const isOpen = ref(false);
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  const toggleOption = (option) => {
    const newValue = [...props.modelValue];
    const index = newValue.indexOf(option);
    if (index === -1) {
      newValue.push(option);
    } else {
      newValue.splice(index, 1);
    }
    emit('update:modelValue', newValue);
  };
  
  const removeItem = (item) => {
    const newValue = props.modelValue.filter(i => i !== item);
    emit('update:modelValue', newValue);
  };
  </script>