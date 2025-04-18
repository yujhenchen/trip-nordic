/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Leverages the internal Python implementation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: { input: any; output: any; }
};

export type ActivitiesConnection = {
  __typename?: 'ActivitiesConnection';
  activities?: Maybe<Array<Maybe<ActivityType>>>;
  edges?: Maybe<Array<Maybe<ActivitiesEdge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type ActivitiesEdge = {
  __typename?: 'ActivitiesEdge';
  cursor?: Maybe<Scalars['ID']['output']>;
  node?: Maybe<ActivityType>;
};

export type ActivityType = Node & {
  __typename?: 'ActivityType';
  accessible: Scalars['Boolean']['output'];
  activities?: Maybe<Array<Maybe<ActivityType>>>;
  category: Scalars['String']['output'];
  city: Scalars['String']['output'];
  descriptionen: Scalars['String']['output'];
  /** The ID of the object */
  id: Scalars['ID']['output'];
  idinternal: Scalars['UUID']['output'];
  languages: Scalars['String']['output'];
  nameen: Scalars['String']['output'];
  region: Scalars['String']['output'];
  seasons: Scalars['String']['output'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object */
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  activities?: Maybe<ActivitiesConnection>;
};


export type QueryActivitiesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type GetActivitiesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetActivitiesQuery = { __typename?: 'Query', activities?: { __typename?: 'ActivitiesConnection', totalCount?: number | null, edges?: Array<{ __typename?: 'ActivitiesEdge', node?: { __typename?: 'ActivityType', id: string, category: string, city: string, descriptionen: string, languages: string, nameen: string, region: string, seasons: string } | null } | null> | null } | null };


export const GetActivitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActivities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"descriptionen"}},{"kind":"Field","name":{"kind":"Name","value":"languages"}},{"kind":"Field","name":{"kind":"Name","value":"nameen"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetActivitiesQuery, GetActivitiesQueryVariables>;