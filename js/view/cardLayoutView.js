"use strict";

function CardLayoutView() {
    var $nameInput = $(".name-input");
    var $balInput = $(".bal-input");
    var $dateInput = $(".date-input");
    var $pinInput = $(".pin-input");
    var $okButton = $(".ok-button");
    $(".add-card-button").click(function () {
        $nameInput.toggle();
        $balInput.toggle();
        $dateInput.toggle();
        $pinInput.toggle();
        $okButton.toggle();
    });
    $(".ok-button").click(function () {

        var nextCard = new CardCreationForm($nameInput,$dateInput,$balInput,$pinInput);
            $nameInput.toggle();
            $nameInput[0].value = "";
            $balInput.toggle();
            $balInput[0].value = "";
            $dateInput.toggle();
            $dateInput[0].value = "";
            $pinInput.toggle();
            $pinInput[0].value = "";
            $okButton.toggle();
    });
    document.body.addEventListener("card-ejected", function(e) {
        var cardParams = e.detail;
        if (cardParams) insertToWallet(cardParams,$nameInput);
    });
}

//code for dragging (from LearnJavascript)
var DragManager = new function() {
  var dragObject = {};
  var self = this;
  function onMouseDown(e) {
    if (e.which != 1) return;
    var elem = e.target.closest('.new-card');
    if (!elem) return;
    dragObject.elem = elem;

    dragObject.downX = e.pageX;
    dragObject.downY = e.pageY;

    return false;
  }

  function onMouseMove(e) {
    if (!dragObject.elem) return; 

    if (!dragObject.avatar) { 
      var moveX = e.pageX - dragObject.downX;
      var moveY = e.pageY - dragObject.downY;

      if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
        return;
      }

      dragObject.avatar = createAvatar(e); 
      if (!dragObject.avatar) { 
        dragObject = {};
        return;
      }

      var coords = getCoords(dragObject.avatar);
      dragObject.shiftX = dragObject.downX - coords.left;
      dragObject.shiftY = dragObject.downY - coords.top;

      startDrag(e); 
    }

    dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
    dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

    return false;
  }

  function onMouseUp(e) {
    if (dragObject.avatar) { 
      finishDrag(e);
        for (var i=0;i<cards.length;i++){
            if (cards[i]._holderName==$(e.target).children('.holder-name').text()){
                var event = new CustomEvent('cart-inserted', {'detail':cards[i]});
                document.body.dispatchEvent(event);
            }

        }
    }
    dragObject = {};
  }

  function finishDrag(e) {
    var dropElem = findDroppable(e);

    if (!dropElem) {
      self.onDragCancel(dragObject);
    } else {
      self.onDragEnd(dragObject, dropElem);
    }
  }

  function createAvatar(e) {
    var avatar = dragObject.elem;
    var old = {
      parent: avatar.parentNode,
      nextSibling: avatar.nextSibling,
      position: avatar.position || '',
      left: avatar.left || '',
      top: avatar.top || '',
      zIndex: avatar.zIndex || ''
    };

    avatar.rollback = function() {
      old.parent.insertBefore(avatar, old.nextSibling);
      avatar.style.position = old.position;
      avatar.style.left = old.left;
      avatar.style.top = old.top;
      avatar.style.zIndex = old.zIndex
    };

    return avatar;
  }

  function startDrag(e) {
    var avatar = dragObject.avatar;

    document.body.appendChild(avatar);
    avatar.style.zIndex = 9999;
    avatar.style.position = 'absolute';
  }

  function findDroppable(event) {
    dragObject.avatar.hidden = true;

    var elem = document.elementFromPoint(event.clientX, event.clientY);

    dragObject.avatar.hidden = false;

    if (elem == null) {
      return null;
    }

    return elem.closest('.droppable');
  }

  document.onmousemove = onMouseMove;
  document.onmouseup = onMouseUp;
  document.onmousedown = onMouseDown;

  this.onDragEnd = function(dragObject, dropElem) {};
  this.onDragCancel = function(dragObject) {};

};


function getCoords(elem) { 
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

DragManager.onDragCancel = function(dragObject) {
  dragObject.avatar.rollback();
};

DragManager.onDragEnd = function(dragObject, dropElem) {
  dragObject.elem.style.display = 'none';
};





