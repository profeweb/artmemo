AFRAME.registerComponent('outline', {

    schema: {
        color: {default: 'red'},
        scale: {default: 1.05},
        pulse: {default: false},
        frequency: {default: 1}
    },

    init: function(){
        this.material = new THREE.MeshBasicMaterial( { color: this.data.color , side: THREE.BackSide } );
        this.mesh = new THREE.Mesh( this.el.components.geometry.geometry, this.material );
        this.scale = this.data.scale;
        this.mesh.scale.multiplyScalar(this.scale);
        this.el.object3D.add( this.mesh );
        this.frequency = this.data.frequency;
    },

    setColor: function(color){
        this.material.color.set(color);
        this.material.needsUpdate = true;
    },

    tick: function(t,dt){
        if(this.data.pulse)
            this.mesh.scale.setScalar( (0.2*Math.cos(this.frequency*t/120) ) + this.scale);
    },

    pulse: function(frequency){
        this.frequency = frequency ? frequency:1;
        this.data.pulse = true;
    },

    stopPulse: function(){
        this.data.pulse = false;
        this.scale = this.data.scale;
    },

    remove: function () {
        this.mesh.scale.setScalar(0);
    }

});