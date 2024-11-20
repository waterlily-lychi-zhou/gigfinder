import React from 'react';
import { render, screen } from '@testing-library/react';
import { EventList } from '../../src/components/event-list/event-list';

// Mock the EventCard component to simplify testing
jest.mock('../../src/components/event-card/event-card', () => ({ event }) => <div data-testid="event-card">{event.name}</div>);

describe('EventList Component', () => {
  const mockEvents = [
    { id: '1', name: 'Event 1' },
    { id: '2', name: 'Event 2' },
    { id: '3', name: 'Event 3' }
  ];

  it('renders event cards for each event', () => {
    render(<EventList events={mockEvents} />);
    const eventCards = screen.getAllByTestId('event-card');
    expect(eventCards).toHaveLength(mockEvents.length);
    mockEvents.forEach((event, index) => {
      expect(eventCards[index]).toHaveTextContent(event.name);
    });
  });

  it('displays "No events found." when events array is empty', () => {
    render(<EventList events={[]} />);
    expect(screen.getByText('No events found.')).toBeInTheDocument();
  });
});
