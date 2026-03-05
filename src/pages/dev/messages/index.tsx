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
    <div
      style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily:
          '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
      }}
    >
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '8px',
            color: '#111',
          }}
        >
          Frame Messages
        </h1>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Listening for messages from parent frame...
        </p>
        <div
          style={{
            display: 'inline-block',
            marginTop: '12px',
            padding: '6px 12px',
            backgroundColor: '#e0e7ff',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#4338ca',
          }}
        >
          {messages.length} {messages.length === 1 ? 'message' : 'messages'}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#999',
              fontSize: '15px',
              backgroundColor: '#fafafa',
              borderRadius: '8px',
              border: '2px dashed #e0e0e0',
            }}
          >
            No messages received yet
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'box-shadow 0.2s',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#6b7280',
                    fontFamily: 'monospace',
                  }}
                >
                  #{messages.length - index}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#6b7280',
                  }}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    color: '#9ca3af',
                    letterSpacing: '0.5px',
                    marginBottom: '6px',
                  }}
                >
                  Origin
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#374151',
                    fontFamily: 'monospace',
                    backgroundColor: '#f9fafb',
                    padding: '8px 12px',
                    borderRadius: '6px',
                  }}
                >
                  {message.origin}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    color: '#9ca3af',
                    letterSpacing: '0.5px',
                    marginBottom: '6px',
                  }}
                >
                  Data
                </div>
                <pre
                  style={{
                    padding: '16px',
                    backgroundColor: '#1f2937',
                    color: '#f3f4f6',
                    borderRadius: '6px',
                    overflow: 'auto',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    margin: 0,
                    fontFamily:
                      '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
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
