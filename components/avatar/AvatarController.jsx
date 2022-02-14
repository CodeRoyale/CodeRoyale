import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { UserAvatar } from './Avatar';
import AvatarDropdownMenu from '../avatarDropdownMenu/AvatarDropdownMenu';

const AvatarController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();

  const { styles, attributes } = usePopper(referenceElement, popperElement);

  return (
    <React.Fragment>
      <UserAvatar
        ref={setReferenceElement}
        onClick={() => setIsOpen(!isOpen)}
        aria-hidden='true'
        avatarImage='https://lh3.googleusercontent.com/a-/AOh14Ghc_V15s5eZUxP0PsKFcNnTX1On7c1UQ4BwSGGW=s96-c'
      />
      <AvatarDropdownMenu
        ref={setPopperElement}
        isOpen={isOpen}
        style={styles.popper}
        {...attributes.popper}
      />
    </React.Fragment>
  );
};

export default AvatarController;
