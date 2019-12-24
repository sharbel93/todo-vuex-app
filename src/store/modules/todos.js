import axios from 'axios';

const state = {
    todos: []

};

const getters = {
    allTodos: state => state.todos
};


const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
         // console.log(response.data);
        commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos',
            { title, completed: false });
        commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`); // remove from back-end/ server
        commit('removeTodo', id);
    },

    async filterTodos({ commit }, e) {
        // Get selected number
        const limit  = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        commit('setTodos', response.data);
    }
};

const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id) // remove from the ui
};

export default {
    state,
    getters,
    actions,
    mutations
};
