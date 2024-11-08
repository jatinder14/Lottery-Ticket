const swaggerDocs = {
  openapi: '3.0.0',  // OpenAPI version
  info: {
    title: 'Lottery Ticket API',  // API Title
    description: 'A simple API to generate, amend, and check the status of lottery tickets',  // API Description
    version: '1.0.0',  // API Version
  },
  paths: {
    '/api/ticket': {
      post: {
        summary: 'Create a lottery ticket with n lines',
        description: 'Generates a lottery ticket with the specified number of lines.',
        operationId: 'createTicket',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  lines: {
                    type: 'integer',
                    description: 'Number of lines for the ticket',
                    example: 5
                  }
                },
                required: ['lines']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successfully created a ticket',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ticketId: {
                      type: 'string',
                      description: 'ID of the generated ticket'
                    },
                    lines: {
                      type: 'array',
                      items: {
                        type: 'array',
                        items: {
                          type: 'integer',
                          enum: [0, 1, 2]
                        },
                        minItems: 3,
                        maxItems: 3
                      }
                    },
                    checked: {
                      type: 'boolean',
                      description: 'Whether the ticket has been checked'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/ticket/{id}': {
      get: {
        summary: 'Get a lottery ticket by ID',
        description: 'Retrieve the ticket with the specified ID.',
        operationId: 'getTicketById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the ticket to retrieve',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved the ticket',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ticketId: {
                      type: 'string',
                      description: 'ID of the ticket'
                    },
                    lines: {
                      type: 'array',
                      items: {
                        type: 'array',
                        items: {
                          type: 'integer',
                          enum: [0, 1, 2]
                        },
                        minItems: 3,
                        maxItems: 3
                      }
                    },
                    checked: {
                      type: 'boolean',
                      description: 'Whether the ticket has been checked'
                    }
                  }
                }
              }
            }
          }
        }
      },
      put: {
        summary: 'Amend a lottery ticket by ID',
        description: 'Amend the ticket with the specified ID by adding new lines.',
        operationId: 'amendTicket',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the ticket to amend',
            schema: {
              type: 'string'
            }
          }
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  lines: {
                    type: 'integer',
                    description: 'Number of new lines to add',
                    example: 3
                  }
                },
                required: ['lines']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Successfully amended the ticket',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ticketId: {
                      type: 'string',
                      description: 'ID of the amended ticket'
                    },
                    lines: {
                      type: 'array',
                      items: {
                        type: 'array',
                        items: {
                          type: 'integer',
                          enum: [0, 1, 2]
                        },
                        minItems: 3,
                        maxItems: 3
                      }
                    },
                    checked: {
                      type: 'boolean',
                      description: 'Whether the ticket has been checked'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/ticket/status/{id}': {
      put: {
        summary: 'Check the status of a lottery ticket',
        description: 'Check the status of each line on the ticket by ID.',
        operationId: 'checkTicketStatus',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID of the ticket to check status',
            schema: {
              type: 'string'
            }
          }
        ],
        responses: {
          '200': {
            description: 'Successfully retrieved the status of the ticket',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    ticketId: {
                      type: 'string',
                      description: 'ID of the ticket'
                    },
                    status: {
                      type: 'array',
                      items: {
                        type: 'integer',
                        description: 'Status of each line on the ticket'
                      },
                      description: 'Status of each line on the ticket, based on the lottery rules'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/tickets': {
      get: {
        summary: 'Get all lottery tickets',
        description: 'Retrieve all created lottery tickets.',
        operationId: 'getAllTickets',
        responses: {
          '200': {
            description: 'Successfully retrieved all tickets',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      ticketId: {
                        type: 'string',
                        description: 'ID of the ticket'
                      },
                      lines: {
                        type: 'array',
                        items: {
                          type: 'array',
                          items: {
                            type: 'integer',
                            enum: [0, 1, 2]
                          },
                          minItems: 3,
                          maxItems: 3
                        }
                      },
                      checked: {
                        type: 'boolean',
                        description: 'Whether the ticket has been checked'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

module.exports = swaggerDocs;
