// import firebase from './firebase';
import { Component } from 'react';
import { app } from "./firebase";
import Loading  from "./loading";
import BackWithHeader  from "./components/backheader";

// import { getFirestore, collection, getDocs, query, where, addDoc,orderBy } from 'firebase/firestore/lite';
import { collection, query, where, onSnapshot,getFirestore,addDoc,orderBy } from "firebase/firestore";



class Chats extends Component {
  state = {loading:true, myform: [], chats: [], myemail: localStorage.getItem('email'), receiver: window.location.pathname.split('/')[2]??'' };

  chats = async function () {
    const db = getFirestore(app);
    const chatsCollection = collection(db, 'chats');

    const q = query(chatsCollection, where("chatID", "==", this.makeId(this.state.myemail, this.state.receiver)),orderBy("timeStamp", "desc"),);

    // const querySnapshot = await getDocs(q);
    // const chats = querySnapshot.docs.map((achat) => achat.data());
    // console.log(chats);
    // this.setState({ chats });
    // const unsubscribe = 
    onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push(doc.data());
      });
      chats.sort((a,b)=> b.timeStamp - a.timeStamp);
      this.setState({ chats,loading:false },()=>{
        console.log(this.state);
      });
    });
  
  }



  makeId = (mail, anothermail) => {
    const mails = [mail, anothermail];
    mails.sort();
    var result = mails.join('-');
    console.log(result);
    return result;
  }
  addMessage = () => {
    const db = getFirestore(app);
    const chatsCollection = collection(db, 'chats');
    let timestamp = new Date().getTime();

    addDoc(chatsCollection, { "chatID": this.makeId(this.state.myemail, this.state.receiver), "media": "", "content": this.state.myform.chatinput, "owners": [this.state.myemail, this.state.receiver], "receiverfcmtoken": '', "timeStamp": timestamp, "author": this.state.myemail, "referencedMessage": null, });
    console.log('timestamp:', timestamp);
    const myform =this.state.myform;
    myform.chatinput = '';
    this.setState({myform });

  }


  handleinput = (e) => {
    const myform = { ...this.state.myform };
    myform[e.target.name] = e.target.value;
    this.setState({ myform }, () => { console.log(this.state) });

  }
  componentDidMount() {
    this.chats();
    // var chats = this.chats();
    // console.log(chats);
    // this.setState({chats});
    // console.log(db);
  }
  AmITheAuthor = (mail) => {
    return this.state.myemail === mail;
  }

  render() {

    return (this.state.loading)?<><Loading/></>:<div style={{ width: '100%',backgroundColor:'#07003',marginTop:'40px' }}>
      <BackWithHeader title="Chat"/>
      <div className='fixed-content'
      // style={{height:'200px',width:'500px',backgroundColor:'red',
      // }}
      >
         

        {(this.state.chats.length === 0) ? 'Loading...' :
          this.state.chats.map((item) => {
            if (this.AmITheAuthor(item.author)) {
              return <div>
                <div style={{ backgroundColor: 'green', width: '40%', float: 'inline-end', padding: '20px', margin: '20px', alignContent: 'flex-end', borderRadius: '15px 50px 5px 30px' }}>
                  {/* <p>{item.author}<br/> */}
                  {item.content}<br />
                  {(item.media !== "") && <img src={item.media} alt='media' width="40%" style={{ float: 'inline-end' }} />
                  }

                </div>
              </div>;
            } else {
              return <div>
                <div style={{ backgroundColor: 'blue', width: '40%', float: 'inline-start', padding: '20px', margin: '20px', alignContent: 'flex-start', borderRadius: '15px 50px 30px 5px' }}>
                  {/* <hr/> */}
                  {/* <p>{item.author}<br/> */}
                  {item.content}<br />
                  {(item.media !== "") && <img src={item.media} alt='media' width="40%" style={{ float: 'inline-end' }} />
                  }

                </div>
              </div>;

            }


          })}
      </div>
      <div className='afterfixed-content'>
        <input className='chatinput' type='text' name='chatinput' value={this.state.myform.chatinput} onChange={this.handleinput} />
        <button className='sendbutton' onClick={this.addMessage}>Send</button>
      </div>
    </div>

      ;
  }

}

export default Chats;