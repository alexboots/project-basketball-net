import React, { Component } from 'react'
import './About.less'

class About extends Component {
  render() {  
    return (
      <div className="about-us">
        <h3>Project basketball net</h3>
        <h4>About Us</h4>

        <p>We put nets on basketball rims. { /*<b>Nets put up so far: #</b> - need to figure out best spot for this*/}</p>

        <p>Our goal is to ensure everyone knows the sweet sound of 'nothing but net'. Instead of waiting for someone else to come and improve our parks, we want to empower communities to take small steps towards bettering and maintaining our surroundings. </p>

        <p>If you know of a court that needs nets or you want to get involved, <a href="mailto:projectbasketballnet@gmail.com">contact us</a> today. Please note, as of right now we only have volunteers in New York City. </p>

        <h4>Get in touch</h4>
        <p><a href="mailto:projectbasketballnet@gmail.com">projectbasketballnet@gmail.com</a></p>
        <p><a href="https://instagram.com/projectbasketballnet" target="_blank">instagram.com/projectbasketballnet</a></p>
      </div>
    )
  }
}

export default About