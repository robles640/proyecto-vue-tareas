export interface Task {
  id: number
  title: string
  done: boolean
  createdAt: string
}

export interface CreateTask {
  title: string
}

export interface UpdateTask {
  title?: string
  done?: boolean
}
