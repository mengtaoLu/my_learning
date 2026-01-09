import React from 'react';

const TimelineItem = ({ date, title, children }) => (
    <div className="timeline-item">
        <div className="timeline-content">
            <span className="timeline-date">{date}</span>
            <h3>{title}</h3>
            <div>{children}</div>
        </div>
    </div>
);

export default function Timeline({ items }) {
    return (
        <div className="timeline-container">
            {items.map((item, index) => (
                <TimelineItem
                    key={index}
                    date={item.date}
                    title={item.title}
                >
                    {item.content}
                </TimelineItem>
            ))}
        </div>
    );
}