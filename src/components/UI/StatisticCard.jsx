import React from 'react'

function StatisticCard({ title, children }) {
  return (
    <div className="column-container">
        <h3>{title}</h3>
        {children}
    </div>
  )
}

export default StatisticCard