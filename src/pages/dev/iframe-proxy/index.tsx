import { useEffect, useRef, useState } from 'react';

interface RelayedMessage {
  id: string;
  timestamp: number;
  data: any;
  direction: 'parent-to-frame' | 'frame-to-parent';
}

const PANEL_WIDTH = 320;
const DEBUG_BAR_HEIGHT = 36;

function validateIframeUrl(rawUrl: string | null): string | null {
  if (!rawUrl) return null;
  try {
    const parsed = new URL(rawUrl, window.location.origin);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    // Ignore invalid URLs and fall through to return null.
  }
  return null;
}

export default function IframeProxyPage() {
  const [url, setUrl] = useState<string | null>(null);
  const [debug, setDebug] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<RelayedMessage[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isDebug = params.get('debug') === 'true';
    const rawUrl = params.get('url');
    const safeUrl = validateIframeUrl(rawUrl);
    setUrl(safeUrl);
    setDebug(isDebug);
    setMounted(true);
    if (isDebug) {
      document.body.style.backgroundColor = '#1f2937';
    }
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source === window.parent) {
        iframeRef.current?.contentWindow?.postMessage(event.data, '*');
        setMessages((prev) => [
          {
            id: `${Date.now()}-${Math.random()}`,
            timestamp: Date.now(),
            data: event.data,
            direction: 'parent-to-frame',
          },
          ...prev,
        ]);
      } else if (event.source === iframeRef.current?.contentWindow) {
        window.parent.postMessage(event.data, '*');
        setMessages((prev) => [
          {
            id: `${Date.now()}-${Math.random()}`,
            timestamp: Date.now(),
            data: event.data,
            direction: 'frame-to-parent',
          },
          ...prev,
        ]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!url) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          fontFamily:
            '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
          fontSize: '14px',
          color: '#666',
        }}
      >
        Missing required{' '}
        <code style={{ margin: '0 4px', color: '#c0392b' }}>url</code> query
        parameter
      </div>
    );
  }

  return (
    <>
      {debug && (
        <div
          style={{
            position: 'fixed',
            top: 6,
            left: 0,
            right: 0,
            height: DEBUG_BAR_HEIGHT,
            backgroundColor: 'transparent',
            color: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '8px',
            fontFamily:
              '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
            fontSize: '11px',
            zIndex: 9999,
            boxSizing: 'border-box',
          }}
        >
          <span
            style={{
              backgroundColor: '#4338ca',
              color: '#e0e7ff',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '600',
              flexShrink: 0,
            }}
          >
            iframe-proxy
          </span>
          <span
            style={{
              color: '#9ca3af',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {url}
          </span>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={url}
        style={{
          position: 'fixed',
          top: debug ? DEBUG_BAR_HEIGHT + 12 : 0,
          left: debug ? 12 : 0,
          bottom: debug ? 12 : 0,
          width: debug ? `calc(100% - ${PANEL_WIDTH}px - 24px)` : '100%',
          height: debug ? `calc(100% - ${DEBUG_BAR_HEIGHT}px - 24px)` : '100%',
          border: 'none',
          borderRadius: debug ? '10px' : 0,
          boxShadow: debug
            ? '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)'
            : 'none',
          overflow: 'hidden',
        }}
      />

      {debug && (
        <div
          style={{
            position: 'fixed',
            top: DEBUG_BAR_HEIGHT,
            right: 0,
            bottom: 0,
            width: PANEL_WIDTH,
            backgroundColor: 'transparent',
            borderLeft: 'none',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'hidden',
            fontFamily:
              '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
          }}
        >
          <div
            style={{
              backgroundColor: '#1f2937',
              color: '#f3f4f6',
              padding: '0 12px',
              height: DEBUG_BAR_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                backgroundColor: '#4338ca',
                color: '#e0e7ff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: '600',
                flexShrink: 0,
              }}
            >
              iframe-proxy
            </span>
            <span style={{ color: '#9ca3af' }}>Relayed Messages</span>
            <span
              style={{
                marginLeft: 'auto',
                backgroundColor: '#374151',
                color: '#9ca3af',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: '600',
                flexShrink: 0,
              }}
            >
              {messages.length}
            </span>
          </div>
          <div style={{ padding: '12px', overflowY: 'auto', flex: 1 }}>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              {messages.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '24px 12px',
                    color: '#6b7280',
                    fontSize: '13px',
                    backgroundColor: '#111827',
                    borderRadius: '6px',
                    border: '2px dashed #374151',
                  }}
                >
                  No messages relayed yet
                </div>
              ) : (
                messages.map((message, index) => {
                  const isDown = message.direction === 'parent-to-frame';
                  return (
                    <div
                      key={message.id}
                      style={{
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        padding: '12px',
                        backgroundColor: '#111827',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px',
                          paddingBottom: '8px',
                          borderBottom: '1px solid #374151',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '11px',
                              fontWeight: '600',
                              color: '#9ca3af',
                            }}
                          >
                            #{messages.length - index}
                          </div>
                          <div
                            style={{
                              fontSize: '10px',
                              fontWeight: '600',
                              padding: '1px 5px',
                              borderRadius: '4px',
                              backgroundColor: isDown ? '#dbeafe' : '#dcfce7',
                              color: isDown ? '#1d4ed8' : '#16a34a',
                            }}
                          >
                            {isDown ? '↓ parent→frame' : '↑ frame→parent'}
                          </div>
                        </div>
                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                          {new Date(message.timestamp).toLocaleTimeString()}
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
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
