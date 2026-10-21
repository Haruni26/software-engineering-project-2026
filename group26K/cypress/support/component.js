import { mount } from 'cypress/react'
Cypress.Commands.add('mount', mount)

// global stylesheet for components
import '../../src/index.css'