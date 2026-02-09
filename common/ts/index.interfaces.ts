import type {
  Email,
  Password,
  Id,
  FirstName,
  LastName,
  HttpResponseStatusCode,
  HttpResponseStatusMessage,
} from "@types";

/**
 * Interface for two-level navigation item
 */
export interface NavigationItem {
  readonly label: string;
  readonly path?: string;
  readonly subitems: {
    readonly label: string;
    readonly path?: string;
  }[];
}

/**
 * Contains props for creating Next Image
 */
export interface NextImageProps {
  readonly src: `/static/${string}`;
  readonly originalSize: [number, number];
  readonly alt?: string;
  readonly width?: {
    readonly sm?: number;
    readonly md?: number;
    readonly lg?: number;
  };
}

/**
 * Client-side user-related data.
 */
export interface SafeUser {
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Data needed to register a user.
 */
export interface RegisterValues {
  firstName: FirstName;
  lastName: LastName;
  email: Email;
  password: Password;
}

/**
 * Server-side user-related data.
 */
export interface FullUser extends SafeUser {
  password: Password;
  id: Id;
}

export interface HttpResponseStatus {
  readonly code: HttpResponseStatusCode;
  readonly message: HttpResponseStatusMessage;
}
