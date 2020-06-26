import React from 'react'
import './styles.css'
import SidebarElementComponent from '../sidebarelement/sidebarelement'

class SidebarComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.setContent = this.setContent.bind(this)
        this.deleteContent = this.deleteContent.bind(this)
    }

    handleClick(event)
    {

        this.props.newArticle()
    }

    setContent(content,title)
    {
        this.props.setContent(content,title)
    }

    deleteContent(_title)
    {
        this.props.deleteContent(_title)
     
    }
    render()
    {
       // console.log("this is from side bar view",this.props)
        return(
            <div className="sidebar">
                <button className="new-article" onClick={this.handleClick}>New Article</button>
                {this.props.data?this.props.data.map((_element,_key)  => 
                {
                    return(
                        <div key={_key}>
                            <SidebarElementComponent content={_element.content} title={_element.id} setContent={this.setContent} selectedTitle={this.props.selectedTitle} deleteContent={this.deleteContent}/>
                        </div>
                    )
                }):
                null}
                
            </div>
        )
    }
}

export default SidebarComponent
