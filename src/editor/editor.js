import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './styles.css'
import ReactQuill from 'react-quill';
const firebase = require('firebase')

class EditorComponent extends React.Component 
{
    constructor(props)
    {
        
        super(props)
        this.state = {
            title:"",
            content:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event,editor)
    {
        this.setState(
            {
                content:editor.getData()
            },() =>
            {
                this.props.contentSelect(this.state.content)
            }
            
        )
        
    }


    handleClick(event)
    {
        

         this.props.updateContent(this.state.content,this.state.title)

    }

    componentWillReceiveProps(newProps)
    {
        
        this.setState(
            {
                title:newProps.selectedTitle,
                content:newProps.selectedContent
            }
        )
    }


    render()
    {
        console.log(this.state)
        return(
            <div className="editor-container">
                <CKEditor
                    editor={ ClassicEditor } className="editor" 
                    onChange={(event,editor) => this.handleChange(event,editor)}
                    data={this.state.content}/>
                <div className="btn-container">
                <button className="btn" onClick={this.handleClick}>Submit</button>
                </div>
                
            </div>
        )
    }
}

export default EditorComponent