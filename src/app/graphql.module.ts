import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink, RequestHandler } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { waitForAsync } from '@angular/core/testing';

const uri = 'https://chirpstack.agri-logix.io/graphql';

export function provideApollo(httpLink: HttpLink, keycloakService: KeycloakService): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext(async (operation, prevContent) => {
    const token = await keycloakService.getToken();

    // return { token: 'Bearer ' + token };

    return { headers: { Authorization: `Bearer ${token}` } };
  });
  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return { link, cache };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink, KeycloakService],
    },
  ],
})
export class GraphQLModule {}
