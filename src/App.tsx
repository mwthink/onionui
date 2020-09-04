import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { KvStorage } from './interfaces';
import { ParsedOnion } from './types';
import { OnionInput, OnionTable } from './ui';
import * as Sjcl from 'sjcl';

export interface AppProps {
  storage?: KvStorage
}

interface AppState {
  initialized: boolean;
  cipherkey: string;
  onions: {[hostname:string]: ParsedOnion}
}

export class App extends React.Component <AppProps, AppState> {
  private readonly storageKey = 'onions';
  constructor(props:any){
    super(props);
    this.state = {
      initialized: false,
      cipherkey: 'password',
      onions: {}
    };
  }
  
  componentDidMount(){
    if(!this.props.storage){return this.setState({initialized:true})}
    this.props.storage.get(this.storageKey).then(data => {
      if(!data){return this.setState({initialized:true})}
      try {
        const plaintext = Sjcl.decrypt(this.state.cipherkey, data);
        const parsed = JSON.parse(plaintext);
        this.setState({
          initialized: true,
          onions: parsed['onions'],
        })
      }
      catch(err){
        if(err && err.message === "ccm: tag doesn't match"){
          console.error('Invalid cipherkey');
        }
        else {
          console.error(err);
        }
      }
    })
  }

  addOnions(onions:ParsedOnion[]){
    const data = onions.reduce((acc, onion) => ({...acc,[onion.hostname]:onion}), {})
    this.setState({onions:{...this.state.onions,...data}}, () => {
      if(!this.props.storage){return;}
      const ciphertext = Sjcl.encrypt(this.state.cipherkey, JSON.stringify({onions:this.state.onions}))
      this.props.storage.save(this.storageKey, String(ciphertext))
    })
  }

  render(){
    if(!this.state.initialized){
      return <div>Loading...</div>
    }
    return (
      <Container>
        <Row>
          <Col>
            <OnionInput key={Object.keys(this.state.onions).length} onImport={onions => this.addOnions(onions)}/>
            <hr/>
            Onions stored: {Object.keys(this.state.onions).length}
          </Col>
        </Row>
        <Row>
          <Col>
            <OnionTable onions={this.state.onions}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
