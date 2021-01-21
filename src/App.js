import React, { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';
import Section from './components/Section';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  makeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  
//Взять из localStorage ранее сохраненные данные
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if(parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  //Сохранить в localStorage
  componentDidUpdate(prevState,prevProps) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле контактов');
      //Записывает в хранилище localStorage
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.visibleContacts();
    return (
      <Section>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} contacts={contacts} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.makeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
        </div>
        </Section>
    );
  }
}

export default App;