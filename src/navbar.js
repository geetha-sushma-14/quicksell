import React, { useState, useRef, useEffect} from 'react';
import IconDisplay from './images/Display.svg';
import Icondown from './images/down.svg';
import './navbar.css'
const Navbar = ({ grouping, ordering, onGroupingChange, onOrderingChange }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
      setDropdownVisible(!dropdownVisible);
    };
  
    const handleGroupingChange = (e) => {
      onGroupingChange(e.target.value);
    };
  
    const handleOrderingChange = (e) => {
      onOrderingChange(e.target.value);
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownVisible(false);
        }
      };
  
      
      document.addEventListener('mousedown', handleClickOutside);
  
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [dropdownVisible]);
  
    return (
      <nav className='navigation-bar'>
        {/* Display Button */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className='nav-button'
          >
            <div style={{display:'flex'}}>
              <img src={IconDisplay} alt="Action icon 1" style={{ width: '15px', marginLeft: '5px', marginRight:'10px'}} />
              <div style={{paddingTop:'3px'}}>Display</div> 
              <img src={Icondown} alt="Action icon 1" style={{ width: '20px', marginLeft: '5px' }} />
            </div>
            
          </button>
  
          {/* Dropdown Content */}
          {dropdownVisible && (
            <div className='drop-down'>
              {/* Grouping Option */}
              <div style={{ marginBottom: '10px', display: 'flex'}}>
                <label htmlFor="grouping" style={{ marginRight: '10px' }}>
                  Grouping:
                </label>
                <select
                  id="grouping"
                  value={grouping} 
                  onChange={handleGroupingChange}
                  style={{
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                >
                  <option value="status">Status</option>
                  <option value="users">Users</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
  
              {/* Ordering Option */}
              <div>
                <label htmlFor="ordering" style={{ marginRight: '10px' }}>
                  Ordering:
                </label>
                <select
                  id="ordering"
                  value={ordering} 
                  onChange={handleOrderingChange}
                  style={{
                    padding: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                  }}
                >
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  };

  export default Navbar;