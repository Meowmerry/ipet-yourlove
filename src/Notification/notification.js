import { notification, Icon } from 'antd'
import React from 'react'

const successLoginNotification = (message) => {
  notification.open({
    message: 'Login successful',
    description:'Enjoy the rest of your day with iPet!',
    icon: <Icon type="smile" style={{ color: '#54b600' }} />,
  });
};


const failLoginNotification = (message) => {
  notification.open({
    message: 'Login fail',
    description: "Plese check your username and password. E-mail or password is incorrect.",
    icon: <Icon type="frown"  style={{ color: '#dc4d4d' }} />,
  });
};



const successSignUpNotification = (message) => {
  notification.open({
    message: 'Sign up successful',
    description:'Thank you for resgitering with iPet. Your account has been activated.',
    icon: <Icon type="smile" style={{ color: '#54b600' }} />,
  });
};


const failSignUpNotification = (message) => {
  notification.open({
    message: 'Sign up fail',
    description: "Plese check your username or password. Email already taken",
    icon: <Icon type="frown"  style={{ color: '#dc4d4d' }} />,
  });
};


export { failLoginNotification, successLoginNotification, successSignUpNotification,failSignUpNotification}