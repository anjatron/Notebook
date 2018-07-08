'use strict';

import Markdown from './markdown';
import PlanText from './plainText';
import HTML from './html';
import ToDoList from './toDoList';
import CodeSnippet from './codeSnippet';


// render note style based on props - 
class NoteStyles extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        if (this.props.noteType === 'markdown') {
            return (
                <Markdown {...this.props}/>
            )
        }
        else if (this.props.noteType === 'html') {
            return (
                <HTML {...this.props}/>
            )
        }
        else if (this.props.noteType === 'todolist') {
            return (
                <ToDoList {...this.props}/>
            )
        }
        else if (this.props.noteType === 'codesnippet') {
            return (
                <CodeSnippet {...this.props}/>
            )
        }
        else {
            // plain text default 
            return (
                <PlanText {...this.props}/>
            )
        }
    }
}


export default NoteStyles;