import gql from "graphql-tag";

import { PolicyKey } from "@lib/shopify/types";

export function getPolicyQuery(policyKey: PolicyKey) {
  const queryString = `
    query ${policyKey}($lang: LanguageCode!) @inContext(language: $lang) {
      shop {
        ${policyKey} {
          title
          body
        }
      }
    }
  `;

  return gql(queryString);
}
