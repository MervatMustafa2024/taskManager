new Vue({
    el: "#app",
    data: {
        newTask: "",
        tasks: [],
        filter: "all"
    },
    computed: {
        taskCount() {
            return this.tasks.length;
        },
        filteredTasks() {
            if (this.filter === "completed") {
                return this.tasks.filter(task => task.completed);
            } else if (this.filter === "pending") {
                return this.tasks.filter(task => !task.completed);
            }
            return this.tasks;
        }
    },
    watch: {
        tasks: {
            handler(newVal) {
                localStorage.setItem("tasks", JSON.stringify(newVal));
            },
            deep: true
        }
    },
    methods: {
        addTask() {
            if (this.newTask.trim()) {
                this.tasks.push({ text: this.newTask.trim(), completed: false });
                this.newTask = "";
            }
        },
        removeTask(index) {
            this.tasks.splice(index, 1);
        },
        loadTasks() {
            const savedTasks = localStorage.getItem("tasks");
            if (savedTasks) {
                this.tasks = JSON.parse(savedTasks);
            }
        }
    },
    mounted() {
        this.loadTasks();
    }
});
