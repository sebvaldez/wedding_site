import { assign, setup, fromPromise } from "xstate";
import axiosInstance from '../api/backend';


// My convention:
// any state lowercase is not rendering UI
// any state capitalized will render UI
// there may be refactoring on this later

const initialContext = {
  previousState: null,
  email: '',
  userId: '',
  groupId: '',
  firstName: null,
  lastName: null,
  attending: null,
  rsvpTextUpdates: null,
  dinnerSelection: null,
  foodAllergies: [],
  plannedTransportation: '',
  specialSippingPreference: '',
  otherFoodAllergy: '',
  groupMembersAttending: [],
};

export const rsvpMachine = setup(
  {
    actions: {
      clearUserContext: assign(({ context, event }) => {
        console.log('action: clear user context');
        return { ...context, ...initialContext };
      }),
      setUserContext: assign(({context, event}) => {
        return {
          ...context, // Spread existing context to maintain other properties
          ...event.memberData, // Spread memberData properties, dynamically updating and adding to context
        };
      }),
      setUserIdContext:  assign({
        userId: ({_, event}) => event.userId
      }),
      setUserEmailContext: assign(({ context, event}) => {
        return {
          ...context, // Spread existing context to maintain other properties
          ...event.memberData, // Spread memberData properties, dynamically updating and adding to context
          previousState: 'UserLookupEmail',
          userId: event.memberData.id,
          email: event.email
        };
      }),
      setUserAndGroupIdContext: assign(({event}) => {
        return {
          userId: event.userId,
          groupId: event.groupId
        };
      }),
      setAttendingContext: assign(({ context, event}) => {
        return {
          ...context, // Spread existing context to maintain other properties
          ...event.memberData, // Spread memberData properties, dynamically updating and adding to context
          attending: event.attending // Explicitly handle known properties as needed
        };
      }),
      setGroupMembersAttending: assign(({ context, event }) => {
        return {
          ...context,
          groupMembersAttending: event.attendingMembers
        };
      })
    },
    actors: {
      bulkUpdateMembers:  fromPromise(async ({input}) => {
        // More robust empty object check
        if (!input || Object.keys(input).length === 0) {
          console.error('Invalid input for membersToUpdate');
        }

        try {
          // Ensure that the input is correctly structured for the API endpoint
          const payload = Array.isArray(input) ? input : [input];
          const response = await axiosInstance.patch('/wedding/members/bulk', payload);
          return response.data;
        } catch (error) {
          console.error('Failed to update members:', error);
          throw error; // Rethrowing the error to be handled by the machine's onError transition
        }
      }),
      fetchUsersByGroupId: fromPromise({
      }),
      getMemberByEmail: fromPromise({
        /* ... */
      }),
    },
    guards: {
      "USER_AND_GROUP_SET?": ({ context, event }, params) => {
        return false;
      },
    },
    delays: {}
  }
).createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QCUDKA1ACgAgOoEsAvAQwCcJsBZYgYwAt8A7MAOgGE6waBrTM4gLawAxJgCCyMZVQB9AHIB5OQFEA2gAYAuolAAHAPax8AF3z7GOkAA9EARgCcANhaOA7ABYArOvWfPjgCZ7AA53AGYAGhAAT0RQ2xYA1zCAx3cA93tbIPsAX1yotCw8IjIKanomVg4uXn4hUQkpWQBxZAUAVUwZAEkAEQ1tJBADI1NzSxsEB2c3Lx8-QJDwqNiEMMdnUL8w4Pt1YNcA23d3fMKMHAIScipaBmZ2Th4+UkERcUlpGQ7UZWRegMtJZRiYzBZhlMZi4PN5fP4gqFIjE4gkvG40mEsccwiFziAildSrcKg9WB1YGBSAAZfT6bgAV10ygExHwABthL9-jJlJQxD1qTJqQoFABpLqDEGGMETSF2MKeewsVz2MLqLz2ALqMK2YKrRCalUBXbuQIm+xm2z4wklG7le5VFgUqliYzGMCMCDERg0MDCABCYjYYpkADF2pQfn8AZQOtSACo9GRiBMJ5RyPpiORsNTA4ag8YQ0BTNzBFzuVy2MJVsKV4LqVwGhABDIsJXuasatWeYLBPU2y52sp3SqPF2kN0er0+v2B4NiqUFmVFyYKvUsfauRy2bKV3bBRzNvzuTchTyuYKeU6OS2eQfFa4j0lOidTz3e33+7kAsOdTNLnoK7gmu0y2AcLDhPYaq4ikpz2J4zYOKejh9r227qPYriYQED5Evao5ks6lKTu6H6zt+MbyAoCYpmmGZ9D0cgtIBIzAXKJbruWW47nuyR9keKIttuiTuFeF5moq-j3gUBJDk+JKOuOJHvjOX5clRuCCkKAbKHR6aZkxLH5kBYwgfK0y6txja8Rk-GHkhuosCcwQbNk2qqscZyybaCkOmO5IkWw5gAGb4KQAgKLoxgKAyxjziGrGFuZnHTGJ6iJIql5pDqqS7M2rbOOk6o9p216+N5FyPsS-lEROwWMGFEVRTFcUaTybBKGGPTIFGCiYLRnQJkl7HFtYdgNs4JXQYcM3qAE+pCUEYQsLithKnserQeqMlVfhz5KYFVJ9EwTBQJgpBgCFVKen6IhBolJlsWZHHjWlDaZehO7BAtQSIUJ-ara2exHCErgYa4eHDopAXEcdp2MOdl3XZdX4iD+MidXI3W9cofQyJgyDKGG-wZrmqAjS9Y1QpNq2YTNqohPNi1rC5iRZIqji+NB61pFDfmEa+JGUAy7KmKpn5zhjbAABLKCGvRyJTsrU4gZYVrWtb1o2BUeJBDgdmVXPpLtcnVQRL7KVSIti-gEsUe1AJtJ03Sy-LoZMcrq4WeraSa9W2tNkJGzKreXjVtqtjG5VZv7TDdW6N6HoTn0xDGMQwgQOYrBMAAbvSrC+TVgvjonadgCnafEAgef6DQafgoMXspW9Jrg5uF5BBqRzh+4uvKq5+yWnefa4pDPnycXlusC0pD6EylBgAIABGVKoGA7JcEWCWLk9yWvVMarlliXi9oE4cpM2Zqnk4Wqn62ioLfzU+HSws-z7oi8r2vG9b+CjsyGdl0GQjE5BGQJkTEmRMczKApnvUaoFsKuCBheW82RMJzGPCcFUlpsKWlOBsPYz8Lav3fkyE6jAzoXSujdNGO9m4HzVpeDW1YtaXh1kJfwKFI7JA2I4U0wRiEHVhmQ3QFCqHI1oXdABQDXYKEoJgakyh0wMNVggX2lZWEB3YUHNYRwMqHl8JefYBDMhCPjk6UR4jEbUJRrdOAACHqhgTAoQB7RgF-CUWwJMShVGgQ0f7OsOjmw7lPKcfwNYFqhB8II-EjB9AQDgJYIuJCArSipqBAAtIJNY2TzG1SdDUF49R4DLgyRZdIzZdjKn4gcea2ptqOFNik4RdUSK0npEyFkbJ2TpJVqBdaoQWCNg1FlbCuwFrHg+mtXc55bybHHntaGBSrakWnJLMAfTvapV3L4Va-DtyuSCOBLEBVLSbn4bqbaGpUH5JLkdUgDUmqRWirFYwWyW5Ql7MqO8MSuZXgCL2M5K0-AIU8KkMSxxtTNMnqktp8NKE2MkajO6HzGHTF7KeEZ4QLzjJ+izOwYlIJKk5u4CqlZFmx2WfcuGpAbbizImpP0aK1Hh2GaENI2ouaAsuVUvYKpdg6g2BqVCjY7nT2dGXZOJFU7pxZaBY4thkFpErJ2QFrl1CbAKn4YZWRsK8yVDqcVpC54LyXqvUg69N40G2c9fpFlwJHGcredUZpwZWRCeoBIl4+G7lvCaIhE9zatMsaasRCMkY0JRUksp9rUrhAykfH6mEax+3+msf5Ko0j8M8DWbIgRrRBrjis6o+gBC6E3h6CA8qLKpHWu2SF1zwb9gCCE28LA9i4o8KqM0Bx8j5CAA */
    id: "RSVP Wizard Machine",
    initial: "CheckParams",
    context: initialContext,
    states: {
      CheckParams: {
        on: {
          PARAMS_NONE: {
            target: "UserLookupEmail",
          },
          PARAMS_GROUP_ID: {
            target: "UserMultiAttendance",
            actions: {
              type: "setUserAndGroupIdContext",
            },
          },
          PARAMS_USER_ID: {
            target: "UserAttendance",
            actions: {
              type: "setUserIdContext",
            }
          },
        },
      },
      UserLookupEmail: {
        on: {
          USER_EMAIL_LOOKUP: {
            target: "UserAttendance",
            actions: {
              type: "setUserEmailContext",
            },
          },
        },
      },
      UserAttendance: {
        on: {
          BACK_FROM_USER_MULTI_ATTENDANCE: {
            target: 'UserMultiAttendance',
          },
          BACK: {
            target: 'UserLookupEmail',
            actions: 'clearUserContext'
          },
          USER_FOUND: {
            actions: {
              type: "setUserContext",
            }
          },
          USER_NOT_ATTENDING: {
            target: "UserConfirmOptOut",
            actions: {
              type: "setAttendingContext",
            },
          },
          USER_WILL_BE_ATTENDING: {
            target: "UserDiningPreferences",
            actions: {
              type: "setAttendingContext",
            },
          }
        }
      },
      UserConfirmOptOut: {
        on: {
          BACK: {
            target: 'UserAttendance'
          },
          USER_CONFIRM_OPT_OUT: {
            target: "UpdateUserData",

          },
        }
      },
      UserDiningPreferences: {
        on: {
          BACK: {
            target: 'UserAttendance'
          },
          USER_CONFIRMED_PREFERENCES: {
            target: "UpdateUserData",
          },
        },
      },
      UserMultiAttendance: {
        on: {
          USER_CHECK_IN: {
            target: "UserAttendance",
            actions: assign({
              previousState: 'UserMultiAttendance'
            })
          },
          USER_GROUP_CHECK_IN: {
            target: "GroupMemberSelection",
            actions: assign({
              previousState: 'UserMultiAttendance'
            })
          },
        },
      },
      UpdateUserData: {
        invoke: {
          input: ({ context, event }) => {
            return { id: context.userId, attending: context.attending, ...event.values };
          },
          src: 'bulkUpdateMembers',
          onDone: {
            target: "Completed",
          },
        },
      },
      GroupMemberSelection: {
        on: {
          BACK: {
            target: 'UserMultiAttendance'
          },
          USER_GROUP_DINING_PREFERENCES: {
            target: "GroupDiningPreferences",
            actions: 'setGroupMembersAttending'
          }
        },
      },
      GroupDiningPreferences: {
        on: {
          BACK: {
            target: 'GroupMemberSelection'
          },
          USER_GROUP_COMPLETE: {
            target: "Completed",
          },
          USER_BACK_TO_GROUP_SELECTION: {
            target: "GroupMemberSelection",
          },
        },
      },
      Completed: {
        invoke: {
          input: {},
          src: "bulkUpdateMembers",
          id: "bulkUpdateMembers",
        },
      },
    },
  }
);