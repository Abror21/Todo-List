import './todo-list-item.css';

const TodoListItem = ({ label, important, done, itemDelete, onToggleDone, onToggleImportant }) => {
    
    let itemStyle = "todo-list-item";
    
    if(important){
      itemStyle += ' important';
    }
    if(done){
      itemStyle += ' done';
    }

    return (
      <span className={itemStyle}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone}
        >
          {label}
        </span>
          <button 
              type="button"
              className="btn btn-outline-success btn-sm float-right"
              onClick={onToggleImportant}
          >
            <i className="fa fa-exclamation" />
          </button>
  
          <button
            type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={itemDelete}
          >
           <i className="fa fa-trash-o" />
          </button>
      </span>
    );
  }

export default TodoListItem;

