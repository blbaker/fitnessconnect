import { RootStoreModel, AuthStoreModel, ConfigStoreModel, NavigationStoreModel } from './';

type RootStoreType = typeof RootStoreModel.Type;
export interface RootStore extends RootStoreType {}
type RootStoreSnapshotType = typeof RootStoreModel.SnapshotType;
export interface RootStoreSnapshot extends RootStoreSnapshotType {}

type AuthStoreType = typeof AuthStoreModel.Type;
export interface AuthStore extends AuthStoreType {}
type AuthStoreSnapshotType = typeof AuthStoreModel.SnapshotType;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}

type ConfigStoreType = typeof ConfigStoreModel.Type;
export interface ConfigStore extends ConfigStoreType {}
type ConfigStoreSnapshotType = typeof ConfigStoreModel.SnapshotType;
export interface ConfigStoreSnapshot extends ConfigStoreSnapshotType {}

type NavigationStoreType = typeof NavigationStoreModel.Type;
export interface NavigationStore extends NavigationStoreType {}
type NavigationStoreSnapshotType = typeof NavigationStoreModel.SnapshotType;
export interface NavigationStoreSnapshot extends NavigationStoreSnapshotType {}
