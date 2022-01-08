import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import Comment from './components/Comment';

const { TextArea } = Input;

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            arrayComment: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.onAddBtnComment = this.onAddBtnComment.bind(this);
    }

    componentDidMount() {
        let commentArrayLocal = JSON.parse(localStorage.getItem('commentLocal'));
        
        if(commentArrayLocal != null) {
            this.setState({ arrayComment: commentArrayLocal });
        } 
    }

    handleChange = event => {
        this.setState({ comment: event.target.value });    
    }

    onAddBtnComment = () => {
        let newComment = this.state.comment;
        newComment.trim(); // удаляем пробелы перед и после комментария
        if(newComment === '' || newComment.trim().length === 0){
            alert('Введите корректный комментарий');
        } else {
            this.state.arrayComment.unshift(newComment); //добавления комментария в начало массива
        }

        this.setState({arrayComment: this.state.arrayComment});

        this.setState({comment: ''}); //очистка textarea

        localStorage.setItem('commentLocal', JSON.stringify(this.state.arrayComment));
    }

    onClrBtnComment = () => {
        localStorage.clear();
        this.setState({arrayComment: []});
        this.setState({comment: ''});
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.arrayComment.map((item, index) => (
                        <Comment key={index.toString()} message={item} type={index === 0 ? 'success' : 'info'} />
                    ))
                }

                <TextArea onChange={this.handleChange} value={this.state.comment} />

                <button onClick={this.onAddBtnComment}>Добавить</button>
                <button onClick={this.onClrBtnComment}>Очистить</button>
            </div>
        );
    }
}

export default App;