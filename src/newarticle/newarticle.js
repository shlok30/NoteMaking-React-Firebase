import React from 'react'
import './styles.css'
const firebase = require("firebase")

class NewArticleComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            title:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick= this.handleClick.bind(this)
    }

    handleChange(event)
    {
        this.setState(
            {
                title:event.target.value
            }
        )
    }

    handleClick(event)
    {
        
         this.props.setTitle(this.state.title)
         

    }

    render()
    {
        
        return(
            <div className="new-article-container">
                <div className="container">
                <input type="text" placeholder="Title of Article" value={this.state.title} onChange={this.handleChange}/>
                <button className="title-btn" onClick={this.handleClick}>Set Title</button>
                </div>
            </div>
        )
    }
}

export default NewArticleComponent