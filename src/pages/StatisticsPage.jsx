import React from 'react'
import '../styles/pages/StatisticsPage.css'

function StatisticsPage() {
  return (
    <div className='container'>
        <h1>Park Stats</h1>
        <div className='stats-container'>
            <div className="row-container">
                <div className="column-container">
                    <h3>Total Tickets for all Games for a certain Date</h3>
                    <form action="">
                        <label>Date:</label>
                        <input type="date" />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div className="column-container">
                    <h3>Amount of Tickets for certaing Game and Date</h3>
                    <form action="">
                        <label htmlFor="">Date:</label>
                        <input type="date" />
                        <label htmlFor="">Game:</label>
                        <select name="" id="">
                            <option value="">Game 1</option>
                            <option value="">Game 2</option>
                            <option value="">Game 3</option>
                        </select>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
            <div className="row-container">
                <div className="column-container">
                    <h3>Total Tickets for all Games for a certain Date</h3>
                    <form action="">
                        <label>Date:</label>
                        <input type="date" />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div className="column-container">
                    <h3>Total Tickets for all Games for a certain Date</h3>
                    <form action="">
                        <label>Date:</label>
                        <input type="date" />
                        <button type='submit'>Submit</button>
                    </form>
                </div>                
            </div>
            <div className="row-container">
                <div className="column-container">
                    <h3>Total Tickets for all Games for a certain Date</h3>
                    <form action="">
                        <label>Date:</label>
                        <input type="date" />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                <div className="column-container">
                    <h3>Total Tickets for all Games for a certain Date</h3>
                    <form action="">
                        <label>Date:</label>
                        <input type="date" />
                        <button type='submit'>Submit</button>
                    </form>
                </div>                
            </div>
            <div className="row-container">
                <div className="column-container">
                
                </div>
                <div className="column-container">
                </div>               
            </div>
        </div>
    </div>
  )
}

export default StatisticsPage