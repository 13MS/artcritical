import React from 'react';
import { render } from 'react-snapshot'
import AppRoutes from './components/AppRoutes';


import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/react-dates/lib/css/_datepicker.css';
import '../node_modules/react-select/dist/react-select.css'; 
import '../node_modules/smooth-scroll/dist/js/smooth-scroll.js';


// Function rendering the App
const renderApp = (Component) => {
  render(
      <Component/>,
    document.querySelector('#thelist'),
  );
};

// Initial Render
renderApp(AppRoutes);
