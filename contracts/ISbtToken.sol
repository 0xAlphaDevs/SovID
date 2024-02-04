// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ISbtToken {
    struct Credential {
        string holderName;
        string institution;
        string course;
        string yearOfPassing;
        string grade;
    }

    struct VerificationRequest {
        address requestedBy;
        address credentialHolder;
        uint256 tokenId;
        string status; // E.g., "Pending", "Approved", "Rejected"
        address sbtAddress;
        string sbtName;
        string sbtSymbol;
    }

    event CredentialIssued(uint256 tokenId, address to);
    event ApprovedVerificationRequest(
        address credentialHolder,
        uint256 tokenId,
        address verifier
    );

    function requestForVerification(
        address credentialHolder,
        uint256 tokenId,
        address sbtAddress,
        string memory sbtName,
        string memory sbtSymbol
    ) external;

    function addVerifier(uint256 tokenId, address verifier) external;

    function addIssuer(address issuer) external;

    function removeIssuer(address issuer) external;

    function issueCredential(
        address to,
        string memory holderName,
        string memory institution,
        string memory course,
        string memory yearOfPassing,
        string memory grade
    ) external;

    function verifyCredential(
        uint256 tokenId
    ) external view returns (Credential memory);

    function getVerificationRequestsForUser()
        external
        view
        returns (VerificationRequest[] memory);

    function getVerificationRequestsByOrganization()
        external
        view
        returns (VerificationRequest[] memory);

    function approveVerificationRequest(
        uint256 tokenId,
        address verifier
    ) external;

    function rejectVerificationRequest(
        uint256 tokenId,
        address verifier
    ) external;
}
