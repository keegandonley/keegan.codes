import { useEffect, useState } from 'react';

interface Message {
  id: string;
  timestamp: number;
  data: any;
  origin: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const newMessage: Message = {
        id: `${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
        data: event.data,
        origin: event.origin,
      };

      setMessages((prev) => [newMessage, ...prev]);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Frame Messages</h1>
      <p>Listening for messages from parent frame...</p>
      <p>Total messages: {messages.length}</p>

      <div style={{ marginTop: '20px' }}>
        {messages.length === 0 ? (
          <p style={{ color: '#666' }}>No messages received yet</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '12px',
                marginBottom: '12px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <strong>Time:</strong>{' '}
                {new Date(message.timestamp).toLocaleTimeString()}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Origin:</strong> {message.origin}
              </div>
              <div>
                <strong>Data:</strong>
                <pre
                  style={{
                    marginTop: '4px',
                    padding: '8px',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    overflow: 'auto',
                  }}
                >
                  {JSON.stringify(message.data, null, 2)}
                </pre>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
