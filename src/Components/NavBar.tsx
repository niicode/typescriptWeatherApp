import React from 'react'
import axios from 'axios';


 import "./Nav.css"



class NavBar extends React.Component {

   
    state ={
        userName:"",
        email: "",
        error: "",
        location: "",
        comment: "",
        Country: "",
        time: "",
        region: "",
        img: "",
        feelslike: "",

        serverError: ""
    }   

    
    


    handleError = (e:any) => {
        const name:string = e.target.value
        if (!name.length) {
            this.setState({error: "This must be filled"})
        }else {
            this.setState({error: ""})
        }
    }



    handleUserInputCity = (e: any): void =>{
        this.setState({location: e.target.value})
    }

    // handleNumberOfDays = (e:any):void =>{
    //     this.setState({days:e.target.value})
    // }
    render(){
        const errorColor = {
            color: "red"
        }

     const options:any = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
            params: {q:this.state.location, days:1},
            headers: {
              'x-rapidapi-key': '350f89b890msh4dce82a84cdef66p121191jsnfc5cc8ed3c46',
              'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
          };
          
          const onSubmit = (e:any):void=>{
            e.preventDefault()
            axios.request(options).then((response) => {
                console.log(response.data);

                if (response.status === 400){
                    
                    this.setState({serverError: "This location is incorrect"})
                    }else {
                        this.setState({serverError: ""})
                    }
                // console.log(response.data.current.condition.icon)
                const data = response.data
                this.setState({Country: data.location.country})
                this.setState({time: data.location.localtime})
                this.setState({region: data.location.region})
                this.setState({img:data.current.condition.icon})
                this.setState({comment: data.current.condition.text})
                this.setState({feelslike: data.current.feelslike_c})

                
            }).catch((error)=> {
                console.error(error);
          });

          
        }
    
        return(
            <div style={{width:"50%", marginLeft:"25%", marginTop:"10%"}}>
                <form  onSubmit={onSubmit}>
               <input type="text" value={this.state.location} 
                    onChange={this.handleUserInputCity} onBlur= {(e)=> {this.handleError(e)}}/>
                    {this.state.error && <h3 style= {errorColor}>{this.state.error}</h3>}
                    {/* <input type="text" value={this.state.days} 
                    onChange={this.handleNumberOfDays} onBlur= {(e)=> {this.handleError(e)}}/>
                    {this.state.error && <h3 style= {errorColor}>{this.state.error}</h3>} */}
                    {this.state.serverError && <p style={errorColor}>{this.state.serverError}</p>}
                    <button>Submit</button>
                </form>
                
                <p>{this.state.comment}</p>
                <h3>Country is : {this.state.Country}</h3>
                <img src= {this.state.img} alt=""/>
                <h4>{this.state.feelslike} Celcius</h4>
                <h3>Local time is : {this.state.time}</h3>
                <h3>Region :{this.state.region}</h3>
            </div>
        )
    }
}

export default NavBar;