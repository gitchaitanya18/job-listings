import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './services.css';

const Services: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabChange = (newValue: number) => {
    setSelectedTab(newValue);
  };

  const services = [
    {
      title: 'Job Seeker Services',
      content: (
        <>
          <p>
            Our comprehensive Job Seeker Services are designed to assist you at every stage of your career journey.
          </p>
          <h3>Services:</h3>
          <ul>
            <li>User-friendly job search</li>
            <li>Professional profile creation</li>
            <li>Resume building assistance</li>
          </ul>
          <p>
            Join our webinars to gain valuable insights into the current job market trends and receive salary negotiation tips to maximize your earning potential.
          </p>
          <p>
            <strong>Tips for Job Seekers:</strong> Tailor your resume for each job application, practice common interview questions, and network with professionals in your industry.
          </p>
          <p>
            <em>Quote:</em> "The only way to do great work is to love what you do." - Steve Jobs
          </p>
          <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/Tt08KmFfIYQ"
  title="Resume Writing Tips"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  frameBorder="0"
  allowFullScreen
></iframe>

        </>
      ),
    },
    {
      title: 'Employer Services',
      content: (
        <>
          <p>
            Our Employer Services streamline the hiring process and enhance your recruitment strategies.
          </p>
          <h3>Services:</h3>
          <ul>
            <li>Efficient candidate matching</li>
            <li>Customized job listings</li>
            <li>Advanced applicant tracking system</li>
          </ul>
          <p>
            Our employer blog offers valuable recruitment tips, and you can access employee onboarding support for a smooth integration process.
          </p>
          <p>
            <strong>Recruitment Technique:</strong> Use behavioral questions in interviews to assess candidates' problem-solving and interpersonal skills.
          </p>
          <p>
            <em>Quote:</em> "Great vision without great people is irrelevant." - Jim Collins
          </p>
          <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/QV8Hi2O0KuE"
  title="Interview Tips"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  frameBorder="0"
  allowFullScreen
></iframe>

        </>
      ),
    },
    {
      title: 'Career Guidance',
      content: (
        <>
          <p>
            Our Career Guidance services provide personalized advice and resources to help you navigate your professional path.
          </p>
          <h3>Services:</h3>
          <ul>
            <li>Personalized career advice</li>
            <li>Interview preparation guides</li>
            <li>Access to industry-specific webinars</li>
          </ul>
          <p>
            Our career growth webinar provides insights into continuous professional development and successful networking strategies.
          </p>
          <p>
            <strong>Career Development Tip:</strong> Set short-term and long-term career goals to guide your professional growth.
          </p>
          <p>
            <em>Quote:</em> "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work." - Steve Jobs
          </p>
          <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/PKONoEZTNXM"
  title="Career Guidance Video"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  frameBorder="0"
  allowFullScreen
></iframe>

        </>
      ),
    },
  ];

  return (
    <div className="services-container">
      <h1 className="services-heading">Services</h1>

      <div className="services-section" style={{ marginBottom: '20px' }}>
        {services.map((service, index) => (
          <button key={index} onClick={() => handleTabChange(index)}>
            {service.title}
          </button>
        ))}
      </div>

      {services.map((service, index) => (
        <div key={index} className="services-section" style={{ display: selectedTab === index ? 'block' : 'none', marginBottom: '40px' }}>
          <h2>{service.title}</h2>
          {service.content}
        </div>
      ))}

      {/* Call to Action */}
     

      {/* Footer */}
     
    </div>
  );
};

export default Services;
