'use client';

import { useState } from 'react';
import styles from './recursive.module.css';
import { merge } from '@/util/classNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faFolderOpen } from '@keegandonley/pro-solid-svg-icons';

const RocketLaunchComponent = (props: { interval: number; count: number }) => {
  if (props.count <= 0) {
    return 'liftoff!';
  }

  return (
    <>
      {props.count}...
      <RocketLaunchComponent
        count={props.count - props.interval}
        interval={props.interval}
      />
    </>
  );
};

export const RocketLaunch = ({ interval = 1 }: { interval: number }) => {
  const [count, setCount] = useState(10);

  return (
    <div className={merge(styles.wrapper)}>
      <input
        type="range"
        min={0}
        max={20}
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value, 10))}
      />
      <span className={styles.output}>
        React Code:
        <code
          className={merge(styles.example, styles.fixed)}
        >{`<RocketLaunch count={${count}} />`}</code>
      </span>
      <div className={styles.output}>
        Rendered Output:
        <div className={styles.example}>
          <RocketLaunchComponent count={count} interval={interval} />
        </div>
      </div>
    </div>
  );
};

const FileTreeComponent = (props: any) => {
  const path = `${props.path ?? ''}/${props.node.name}`;
  return (
    <div
      style={{
        paddingLeft: '15px',
      }}
    >
      <div
        style={{
          display: 'flex',
          paddingBottom: '5px',
          columnGap: '5px',
        }}
      >
        {props.node.children ? (
          <FontAwesomeIcon icon={faFolderOpen} />
        ) : (
          <FontAwesomeIcon icon={faFile} />
        )}
        <div>
          {props.node.name} <small className={styles.small}>({path})</small>
        </div>
      </div>
      {props.node.children?.map((child: any) => {
        return (
          <FileTreeComponent
            key={`${path}/${child.name}`}
            node={child}
            path={path}
          />
        );
      })}
    </div>
  );
};

export const FileTree = () => {
  return (
    <FileTreeComponent
      node={{
        name: 'site',
        children: [
          {
            name: 'home',
            children: [
              {
                name: 'index.html',
              },
              {
                name: 'index.css',
              },
            ],
          },
          {
            name: 'about',
            children: [
              {
                name: 'resume',
                children: [
                  {
                    name: 'index.html',
                  },
                ],
              },
              {
                name: 'contact',
                children: [
                  {
                    name: 'company',
                    children: [
                      {
                        name: 'index.html',
                      },
                      {
                        name: 'index.js',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }}
    />
  );
};
