import React from 'react';
 
function MainContent() {
  // Sample data for cards
  const cardsData = [
    { id: 1, title: 'Services', link: 'https://www.google.com/' },
    { id: 2, title: 'Registration Invoice System', link: 'http://localhost:3001/' },
    { id: 3, title: 'Correspondence System', link: '#' },
    { id: 4, title: 'Identity Card (Disability/Senior Citizen)', link: '#' },
    { id: 5, title: 'Certification System', link: '#' },
    { id: 6, title: 'Property Tax System', link: '#' },
    { id: 7, title: 'Cash Receipt System', link: '#' },
    { id: 8, title: 'PAMS', link: '#' },
    { id: 9, title: 'Accounting System', link: '#' },
    { id: 10, title: 'Revenue System', link: '#' },
    { id: 11, title: 'SUTRA', link: '#' },
    { id: 12, title: 'PMEP EMIS System', link: '#' },
    { id: 13, title: 'CEHRD EMIS System', link: '#' },
    { id: 14, title: 'Farmer Indexing System', link: '#' },
    { id: 15, title: 'E-Attendance', link: '#' },
    { id: 16, title: 'Social Security', link: '#' },
    { id: 17, title: 'Event Registration System', link: '#' },
    { id: 18, title: 'Digital Home-Mapping System', link: '#' },
  ];
  // Function to get token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Function to construct link with token
  const constructLink = (link) => {
    const token = getToken();
    return `${link}?token=${token}`;
  };
  
    return (
    <div className="main-content">
      {cardsData.map(card => (
        <div key={card.id} className="card">
          <a href={card.id === 2 ? constructLink(card.link) : card.link}>
            <div className="icon">✅</div>
            <h3 className="title">{card.title}</h3>
          </a>
        </div>
      ))}
    </div>
  );
}
export default MainContent;
