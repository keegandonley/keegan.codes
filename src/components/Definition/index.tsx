import defs from './definitions.json';
import { DefinitionClient } from './DefinitionClient';

export const Definition = (props: { children: keyof typeof defs }) => {
  let def = defs[props.children];
  let key = props.children;

  if ('see' in def && def.see) {
    key = def.see as keyof typeof defs;
    def = defs[def.see as keyof typeof defs];
  }

  if (
    !('partOfSpeech' in def) ||
    !('definition' in def) ||
    !def.partOfSpeech ||
    !def.definition
  ) {
    return <>{props.children}</>;
  }

  return (
    <DefinitionClient
      term={props.children}
      termKey={key}
      partOfSpeech={def.partOfSpeech}
      definition={def.definition}
    />
  );
};
