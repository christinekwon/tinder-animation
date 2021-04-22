import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Flame } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        const WHITE = 0xffffff;
        const BLACK = 0x000000;
        const CORAL1 = 0xfd297b;
        const PINK2 = 0xf9afcd;
        const PINK1 = 0xff5864;
        const CORAL2 = 0xff655b;
        const TURQ = 0x00d9c0;
        const PURP = 0xd9bbf9;

        const medRadius = 4;
        const lilRadius = 6;

        const bigSpeed = 100;
        const medSpeed = 50;
        const lilSpeed = 30;

        // Set background to a nice color
        this.background = new Color(BLACK);

        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);
        // scale, x, y, z, color, twirl (-1 left, 1 right), speed (larger is slower), offset
        const bigFlame = new Flame(this, 0.8, 0, 0, 0, CORAL2, -1, bigSpeed, 0);

        const medFlameT = new Flame(this, 0.25, 0, medRadius, 0, CORAL1, 1, medSpeed, Math.PI / 8 * 0);
        const medFlameTR = new Flame(this, 0.25, -medRadius * Math.cos(Math.PI / 4), medRadius * Math.cos(Math.PI / 4), 0, CORAL1, 1, medSpeed, Math.PI / 8 * 1);
        const medFlameR = new Flame(this, 0.25, -medRadius, 0, 0, CORAL1, 1, medSpeed, Math.PI / 8 * 2);
        const medFlameBR = new Flame(this, 0.25, -medRadius * Math.cos(Math.PI / 4), -medRadius * Math.cos(Math.PI / 4), 0, CORAL1, 1, medSpeed, Math.PI / 8 * 3);
        const medFlameB = new Flame(this, 0.25, 0, -medRadius, 0, CORAL1, 1, medSpeed, Math.PI / 8 * 4);
        const medFlameBL = new Flame(this, 0.25, medRadius * Math.cos(Math.PI / 4), -medRadius * Math.cos(Math.PI / 4), 0, CORAL1, 1, medSpeed, Math.PI / 8 * 5);
        const medFlameL = new Flame(this, 0.25, medRadius, 0, 0, CORAL1, 1, medSpeed, Math.PI / 8 * 6);
        const medFlameTL = new Flame(this, 0.25, medRadius * Math.cos(Math.PI / 4), medRadius * Math.cos(Math.PI / 4), 0, CORAL1, 1, medSpeed, Math.PI / 8 * 7);
        
        const lights = new BasicLights();
        this.add(bigFlame, medFlameTL, medFlameTR, medFlameBR, medFlameBL, lights);
        this.add(medFlameT, medFlameR, medFlameB, medFlameL);
       
        const lilFlameT = new Flame(this, 0.15, -lilRadius * Math.sin(Math.PI / 8), lilRadius * Math.cos(Math.PI / 8), 0, PINK1, -1, lilSpeed, Math.PI / 8 * 0);
        const lilFlameTR = new Flame(this, 0.15, -lilRadius * Math.sin(Math.PI / 8 * 3), lilRadius * Math.cos(Math.PI / 8 * 3), 0, PINK1, -1, lilSpeed, Math.PI / 8 * 1);
        const lilFlameR = new Flame(this, 0.15, -lilRadius * Math.sin(Math.PI / 8 * 5), lilRadius * Math.cos(Math.PI / 8 * 5), 0, PINK1, -1, lilSpeed, Math.PI / 8 * 2);
        const lilFlameBR = new Flame(this, 0.15, -lilRadius * Math.sin(Math.PI / 8 * 7), lilRadius * Math.cos(Math.PI / 8 * 7), 0, PINK1, -1, lilSpeed, Math.PI / 8 * 3);
        const lilFlameB = new Flame(this, 0.15, lilRadius * Math.sin(Math.PI / 8), lilRadius * Math.cos(Math.PI / 8), 0, PINK1, -1, lilSpeed, Math.PI / 8 * 4);
        const lilFlameBL = new Flame(this, 0.15, lilRadius * Math.sin(Math.PI / 8 * 3), lilRadius * Math.cos(Math.PI / 8 * 3), 0, PINK1, -1, lilSpeed, Math.PI / 8 * 5);
        const lilFlameL = new Flame(this, 0.15, lilRadius * Math.sin(Math.PI / 8 * 5), lilRadius * Math.cos(Math.PI / 8 * 5), 0, PINK1, -1, lilSpeed, Math.PI / 8 * 6);
        const lilFlameTL = new Flame(this, 0.15, lilRadius * Math.sin(Math.PI / 8 * 7), lilRadius * Math.cos(Math.PI / 8 * 7), 0, PINK1, -1, lilSpeed, Math.PI / 8 * 7);
        
        this.add(lilFlameT, lilFlameTR, lilFlameR, lilFlameBR, lilFlameB, lilFlameBL, lilFlameL, lilFlameTL);
        // Populate GUI
        // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
