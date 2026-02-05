<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useTasks } from '@/composables/useTasks'

const {
  tasks,
  loadTasks,
  createTask,
  toggleTask,
  deleteTask,
} = useTasks()

const search = ref('')
const dialog = ref(false)
const newTitle = ref('')

onMounted(loadTasks)

const submit = async () => {
  if (!newTitle.value.trim()) return
  await createTask(newTitle.value)
  newTitle.value = ''
  dialog.value = false
}

// filtro local (el backend también soporta search, pero esto pasa)
const filteredTasks = ref(tasks.value)

watch(tasks, () => {
  filteredTasks.value = tasks.value
})

watch(search, () => {
  filteredTasks.value = tasks.value.filter(t =>
    t.title.toLowerCase().includes(search.value.toLowerCase()),
  )
})
</script>

<template>
  <v-container>
    <v-card flat>
      <!-- Header -->
      <template #title>
        <div class="d-flex align-center justify-space-between w-100">
          <span class="text-h6">Gestión de tareas</span>
          <v-btn color="primary" @click="dialog = true">
            <v-icon start icon="mdi-plus" />
            Agregar Tarea
          </v-btn>
        </div>
      </template>

      <!-- Buscador -->
      <v-card-text>
        <v-text-field
          v-model="search"
          label="Buscar por tarea..."
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          clearable
        />
      </v-card-text>

      <!-- Lista -->
      <v-list>
        <v-list-item
          v-for="task in filteredTasks"
          :key="task.id"
        >
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
          >
            {{ task.title }}
          </v-list-item-title>

          <template #append>
            <v-btn icon @click="toggleTask(task.id)">
              <v-icon>
                {{ task.done ? 'mdi-check-circle' : 'mdi-circle-outline' }}
              </v-icon>
            </v-btn>

            <v-btn icon color="error" @click="deleteTask(task.id)">
              <v-icon icon="mdi-delete" />
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- Dialog crear -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Nueva tarea</v-card-title>

        <v-card-text>
          <v-text-field
            v-model="newTitle"
            label="Título de la tarea"
            autofocus
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="submit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
