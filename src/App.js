import React from 'react';
import logo from './logo.svg';
import './App.css';
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'
import NewArticleComponent from './newarticle/newarticle'
const firebase = require("firebase")

class App extends React.Component
{
  constructor()
  {
    super()
    this.state = {
      newArticle:false,
      data:null,
      selectedContent:"",
      selectedTitle:"",
    }
    this.newArticle = this.newArticle.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.setTitle = this.setTitle.bind(this)
    this.setContent = this.setContent.bind(this)
    this.contentSelect = this.contentSelect.bind(this)
    this.deleteContent = this.deleteContent.bind(this)
    

  }

  

  newArticle()
  {
    this.setState((prev) => 
    {
      return(
        {
          newArticle: !prev.newArticle
        }
      )
    })
  }

  contentSelect(_content)
  {
    this.setState(
      {
        selectedContent:_content
      }
    )
  }
  
  updateContent(_content,_title)
  {
    if(this.state.selectedTitle)
    {
      firebase
     .firestore()
     .collection("blog")
     .doc(this.state.selectedTitle)
     .update(
       {
         content: _content,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
       }
     )
    }

    else
    {
      alert("atleast select a note or create a new one")
      return 
    }

    alert("successful update")
    

     this.setState(
       {
         selectedContent:"",
         selectedTitle:"",
       }
     )
  }

  setTitle(_title)
  {
    firebase
         .firestore()
         .collection('blog')
         .doc(_title)
         .set(
             {
                 content:"",
                 timestamp:firebase.firestore.FieldValue.serverTimestamp()
             }
         )
    this.setState(
      {
        selectedTitle:_title,
        selectedContent:""
      },() => alert("start writing content for",this.state.selectedTitle)
    )

    this.newArticle()
  }

  componentDidMount()
  {
    firebase
     .firestore()
     .collection('blog')
     .orderBy('timestamp','desc')
     .onSnapshot((resolve)=> 
     {
       
      const data = resolve.docs.map((_doc) =>
       {
         const data = _doc.data()
         data['id'] = _doc.id
         return data
       })
       
       this.setState(
         {
           data:data
         }
       )
     })
  }

  setContent(content,title)
  {
    this.setState(
      {
        selectedContent:content,
        selectedTitle:title
      },() =>
      {
        console.log(this.state.selectedTitle)
      }
      
    )

    
  
  }

  deleteContent(_title)
  {
    firebase
     .firestore()
     .collection('blog')
     .doc(_title)
     .delete()

     this.setState(
       {
         selectedTitle:"",
         selectedContent:""
       }
     )
  }

  render()
  {
   // console.log("this is from the dashboard",this.state)
    return(
      <div className="body">
        <SidebarComponent newArticle={this.newArticle} data={this.state.data} setContent={this.setContent} selectedTitle={this.state.selectedTitle} deleteContent={this.deleteContent}/>
        {this.state.newArticle? 
        <NewArticleComponent setTitle={this.setTitle} />:this.state.selectedTitle?
        <EditorComponent updateContent={this.updateContent} selectedContent={this.state.selectedContent} selectedTitle={this.state.selectedTitle} contentSelect={this.contentSelect}/>:
        null}
        
      </div>
    )
  }
}

export default App;
