import React from 'react'
import "./styles.css"

class SidebarElementComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            selected:false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event)
    {
        if(event.target.name === 'delete')
        {
            this.props.deleteContent(this.props.title)
        }
        else
        {
            this.props.setContent(this.props.content,this.props.title)
        }
        
        
    }

    

    componentWillReceiveProps(newProps)
    {
        if(newProps.selectedTitle === this.props.title)
        {
            this.setState(
                {
                    selected:true
                }
            )
        }

        else
        {
            this.setState(
                {
                    selected:false
                }
            )
        }
    }

    render()
    {
        console.log(this.state)
        return(
            <div  className={this.state.selected?"selected":"element-container"}>
                <div className="preview">
                    <h4>{this.props.title}</h4>
                    <a href="#" onClick={this.handleClick} name='delete'>Delete</a>
                </div>
                <p className="clickable" onClick={this.handleClick}>{removeHTMLTags(this.props.content.substring(0,30) + '...')}</p>
            </div>
        )
    }
}
export default SidebarElementComponent

export function removeHTMLTags (str) {

  return str.replace(/<[^>]*>?/gm, '');

}