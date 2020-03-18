import Select from './components/Select';
import Input from './components/Input';
import Button from './components/Button';
import TodoList from './components/TodoList';
import TodoItem from './components/TodoItem';
import Codemirror from './components/Codemirror';

const components = [
    Select,
    Input,
    Button,
    Codemirror,
    TodoList,
    TodoItem,
]

const install = function (Vue, otps = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
}

export default install