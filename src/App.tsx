import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { ParsedOnion } from './types';
import { OnionInput, OnionTable } from './ui';

export interface AppProps {}

interface AppState {
  onions: {[hostname:string]: ParsedOnion}
}

export class App extends React.Component <AppProps, AppState> {
  constructor(props:any){
    super(props);
    this.state = {
      onions: {}
    };
  }
  addOnions(onions:ParsedOnion[]){
    const data = onions.reduce((acc, onion) => ({...acc,[onion.hostname]:onion}), {})
    this.setState({onions:{...this.state.onions,...data}})
  }
  render(){
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
