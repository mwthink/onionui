import * as React from 'react';
import { Button, Input } from 'reactstrap';
import { readOnionYaml } from './utils';
import { ParsedOnion } from './types';

export interface OnionInputProps {
  onImport: (onions:ParsedOnion[]) => any
}

export const OnionInput: React.FunctionComponent<OnionInputProps> = props => {
  const [ value, setValue ] = React.useState('');

  const handleImport = () => {
    try {
      const onions = readOnionYaml(value);
      props.onImport(onions);
    }
    catch(err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Input
        type="textarea"
        placeholder="Paste mkp224o yaml output here"
        value={value}
        onChange={e => setValue(e.target.value)}
        />
      <Button block color="primary" onClick={() => handleImport()}>Import</Button>
    </div>
  )
}

export default OnionInput;
