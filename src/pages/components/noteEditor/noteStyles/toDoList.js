'use strict';

import {
    Grid,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    TextField,
    ListItemSecondaryAction,
    IconButton
} from '@material-ui/core';

import {
    Delete
} from '@material-ui/icons';


class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: []
        }
    }

    shouldComponentUpdate() {
        return true;
    }

    componentWillUnmount() {
        var todolist = document.getElementById("note-todolist");
        todolist.removeEventListener("keyup", function() {
            
        });
    }

    componentDidMount() {
        var todolist = document.getElementById("note-todolist");

        let that = this;
        todolist.addEventListener("keyup", function(event) {
            event.preventDefault();

            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                // add new todo item
                let content = that.props.content.slice();
                if (!content) {
                    content = [];
                }
                content.push({text: '', done: false});

                that.props.onEditNote(that.props.note._id, content);
            } 
        });
    }

    onCheckBoxToggle(value, index) {
        let content = this.props.content.slice();

        content[index].done = !value.done;

        this.props.onEditNote(this.props.note._id, content);
    }

    onChangeTaskText(event, index) {
        let content = this.props.content.slice();

        content[index].text = event.target.value;

        this.props.onEditNote(this.props.note._id, content);
    }

    onDeleteTask(index) {
        let content = this.props.content.slice();
        content.splice(index, 1);

        this.props.onEditNote(this.props.note._id, content);
    }

    render() {
        // value = text
        // done = true/false
        // center grid container
        let tasks = this.props.content;
        return (
            <Grid container style={{width: '40%'}} spacing={16}>
                <List id="note-todolist" style={{width: '100%'}}>
                    {tasks.map((task, index) => (
                        <ListItem
                            key={'task-' + index}
                            role={undefined}
                            dense
                        >
                            <Checkbox
                                checked={task.done}
                                value={String(task.done)}
                                onClick={(event) => {
                                    this.onCheckBoxToggle(task, index);
                                }}
                            />
                            <ListItemText
                                primary={
                                    <TextField 
                                        fullWidth={true}
                                        defaultValue={task.text}
                                        onChange={(event) => {
                                            this.onChangeTaskText(event,index)
                                        }}
                                        autoFocus={index === (tasks.length - 1)}
                                    />
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Delete task" onClick={() => this.onDeleteTask(index) }>
                                <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Grid>

        )
    }
}

export default ToDoList;