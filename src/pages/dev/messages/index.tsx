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
    const params = new URLSearchParams(window.location.search);
    if (params.get('seed') === 'true') {
      setMessages([
        {
          id: 'seed-1',
          timestamp: Date.now(),
          data: {
            type: 'example',
            action: 'test',
            payload: {
              userId: 123,
              status: 'active',
              metadata: {
                source: 'parent-frame',
                version: '1.0.0',
              },
            },
          },
          origin: 'https://example.com',
        },
      ]);
    }

    const handleMessage = (event: MessageEvent) => {
      console.log(event);
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
        padding: '12px',
        fontFamily:
          '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '4px',
            color: '#111',
          }}
        >
          Frame Messages
        </h1>
        <p style={{ color: '#666', fontSize: '12px', marginBottom: '6px' }}>
          Listening for messages from parent frame...
        </p>
        <div
          style={{
            display: 'inline-block',
            padding: '4px 8px',
            backgroundColor: '#e0e7ff',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            color: '#4338ca',
          }}
        >
          {messages.length} {messages.length === 1 ? 'message' : 'messages'}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '24px 12px',
              color: '#999',
              fontSize: '13px',
              backgroundColor: '#fafafa',
              borderRadius: '6px',
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
                borderRadius: '6px',
                padding: '12px',
                backgroundColor: '#fff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#6b7280',
                  }}
                >
                  #{messages.length - index}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    color: '#6b7280',
                  }}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>

              <div style={{ marginBottom: '8px' }}>
                <div
                  style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    color: '#9ca3af',
                    letterSpacing: '0.5px',
                    marginBottom: '4px',
                  }}
                >
                  Origin
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#374151',
                    backgroundColor: '#f9fafb',
                    padding: '6px 8px',
                    borderRadius: '4px',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {message.origin}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    color: '#9ca3af',
                    letterSpacing: '0.5px',
                    marginBottom: '4px',
                  }}
                >
                  Data
                </div>
                <pre
                  style={{
                    padding: '8px',
                    backgroundColor: '#1f2937',
                    color: '#f3f4f6',
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontSize: '11px',
                    lineHeight: '1.5',
                    margin: 0,
                    whiteSpace: 'pre',
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
