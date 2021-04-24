import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { Row, Col } from "antd";
import "./Blog.scss";

export default class PetGuide extends Component {
  componentDidMount = () => {
    let token = localStorage.getItem("ACCESS_TOKEN");
    // console.log("token", token);
    if (token) {
      let userInfo = jwtDecode(token);
      console.log("userInfo", userInfo);
      if (userInfo.role === 'ADMIN') {
        this.props.history.push("/home");
      }
    }
  };
  render() {
    return (
      <>
        <br />
        <Row
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="20%"
        >
          <h1>How to interview a pet caregiver.</h1>
        </Row>
        <br />
        <Row
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="20%"
        >
          <img
            alt="ipet"
            className="class-img-blog"
            src="https://cdn.kinsights.com/cache/c2/71/c27122070f67ac5081ae8d7141182b19.jpg"
          />
        </Row>
        <br />
        <Row
          type="flex"
          justify="center"
          justifyContent="space-around"
          margin="20%"
        >
          <Col xs={20} lg={10}>
            <p>
              <strong>
                Conducting your pet care interview is an important part of
                finding the right caregiver. Whether you start with a phone
                interview or an in-person meeting, the topics below will help
                you create an effective interviewing strategy that helps you get
                to know your pet caregiver candidate.
              </strong>
            </p>
            <br />

            <ul>
              <li>
                <strong>Emergency plans: </strong>Do you have a backup pet
                sitter and a veterinarian on call? Create a list of emergency
                contacts for your sitter. Ask your sitter if she has ever
                handled a pet care emergency. Discuss what to do in case she has
                an emergency with your pet.
              </li>
              <br />
              <li>
                <strong>Rates and services: </strong>
                Make a clear list of what you want your pet sitter to do and
                discuss each point. Do you want your pet to be groomed while you
                are gone? Do you need a dog walker? Do you think it's important
                that he spend at least an hour a day catching Frisbees with your
                dog? A pet-sitter can do all these things. But you need to find
                out if your pet sitter will do them and what they typically
                charge for each service.
              </li>
              <br />
              <li>
                <strong>References:</strong>
                Get three references and call them. Checking references is vital
                to getting quality care, so make sure you go through with it.
                Ask what services the sitter provided them, when and why she
                ended her employment with them, and what their level of
                satisfaction was with the sitter's service.
              </li>
              <br />
              <li>
                <strong>Have your pet meet the sitter:</strong>
                Does your pet even like your pet sitter? All the training in the
                world would not forestall a bad match here. You don't want to
                set your pet up on a blind date. Be sure to schedule a
                get-to-know-you meeting at your home or in a local park. Pets
                and their caregivers need to have good chemistry!
              </li>
              <br />
              <li>
                <strong>Is your sitter bonded and insured?</strong>
                This covers many dire contingencies (accidents, negligence,
                theft of your property, and more). If not, you need to have a
                frank discussion about your sitter's roles and responsibilities.
                Check your homeowner's insurance to see what situations would be
                covered in case your sitter or your pet damages something in
                your home. How many other pets is your pet-sitt
              </li>
              <br />
              <li>
                <strong>
                  How many other pets is your pet-sitter currently sitting for?{" "}
                </strong>
                A full dance card, so to speak, means less special attention for
                your pet. Make sure your pet sitter has time for your pet.
              </li>
              <br />
              <li>
                <strong>
                  Is your pet sitter asking you as many questions as you are
                  asking her?{" "}
                </strong>
                sitter doesn't seem especially curious about your pet, that is a
                red flag. Pet caregivers should not only show interest in your
                pet and the job you're offering, but should also ask questions
                to clarify roles and responsibilities. Give them the opportunity
                to give you background information about what motivates them to
                provide great pet care.
              </li>
            </ul>
          </Col>
        </Row>
      </>
    );
  }
}
