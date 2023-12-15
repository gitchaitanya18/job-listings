// import React, { Component } from 'react'
// import { Col, Container, Row } from 'reactstrap'

// export default class Footer extends Component {
//   render() {
//     return (
//       <footer className="footer">
//         <Container>
//           <Row>
//             <Col md={12} className="text-center">
//               <div className="footer-content">
//                 {/* <div className="footer-top">

//                   <div className="footer-columns">
//                     <div className="footer-column">
//                       <h3>For Job Seekers</h3>
//                       <ul>
//                         <li><a href="#">Search Jobs</a></li>

//                         <li><a href="#">About Us</a></li>
//                       </ul>
//                     </div>
//                     <div className="footer-column">
//                       <h3>For Employers</h3>
//                       <ul>
//                         <li><a href="#">Post a Job</a></li>

//                         <li><a href="#">Employer Resources</a></li>
//                       </ul>
//                     </div>
//                     <div className="footer-column">
//                       <h3>Resources</h3>
//                       <ul>
//                         <li><a href="..\scenes\app\seekers\Services\Services.tsx">Sevices</a></li>
//                         <li><a href="#">Contact Us</a></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div> */}
//                 <div className="footer-bottom">


//                   <p>&copy; 2023 Job Portal. All rights reserved by BECG</p>
//                 </div>
//               </div>

//             </Col>
//           </Row>
//         </Container>
//       </footer>
//     )
//   }
// }




import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';

// Define a separate Footer component
class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <div className="footer-content">
                {/* Footer content goes here */}
                <div className="footer-bottom">
                  <p>&copy; 2023 Job Portal. All rights reserved by BECG</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

// Main App or Parent Component
export default class App extends Component {
  render() {
    return (
      <div className="site">
        <div className="content-wrap">
        </div>
        <Footer />
        <style>{`
          .site {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .content-wrap {
            flex: 1;
          }

          .footer {
            background: #333; /* Example background color */
            color: white; /* Example text color */
            text-align: center;
            padding: 10px 0; /* Example padding */
          }
        `}</style>
      </div>
    );
  }
}
