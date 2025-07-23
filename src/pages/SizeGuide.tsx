import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Updated import
import { Label } from '@/components/ui/label';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const SizeGuide = () => {
    const [measurementSystem, setMeasurementSystem] = useState('us');

    return (
        <>
            <SEO
                title="Size Guide | TempoRun"
                description="Size charts and fitting guides for running shoes and apparel to help you find the perfect fit."
                keywords="size guide, shoe size, apparel size, measurement, running shoe fit, TempoRun"
            />
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
                    <h1 className="text-3xl md:text-4xl font-bold mb-6">Size Guide</h1>

                    <Card className="mb-8">
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-semibold mb-4">How to Measure</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-lg font-medium mb-3">Finding Your Perfect Fit</h3>
                                    <p className="mb-4">For the most accurate size measurement, follow these steps:</p>

                                    <ol className="list-decimal pl-6 space-y-3">
                                        <li>Measure your feet in the evening (feet tend to swell throughout the day).</li>
                                        <li>Wear the socks you plan to use with your running shoes.</li>
                                        <li>Trace your foot on a piece of paper while standing upright.</li>
                                        <li>Measure the length from the heel to the longest toe.</li>
                                        <li>Measure the width at the widest part of your foot.</li>
                                        <li>Use our size charts below to find your size.</li>
                                    </ol>

                                    <p className="mt-4">Remember that different brands may fit differently. When in doubt, check the specific brand's size recommendations or size up by half a size for running shoes.</p>
                                </div>

                                <div className="bg-secondary/30 rounded-lg p-6">
                                    <h3 className="text-lg font-medium mb-3">Pro Tips for the Perfect Fit</h3>

                                    <ul className="space-y-3">
                                        <li className="flex">
                                            <div className="font-semibold min-w-[24px]">➀</div>
                                            <p>Allow a thumb's width of space between your longest toe and the end of the shoe.</p>
                                        </li>
                                        <li className="flex">
                                            <div className="font-semibold min-w-[24px]">➁</div>
                                            <p>Your heel should be secure but not tight, with minimal slipping when you walk.</p>
                                        </li>
                                        <li className="flex">
                                            <div className="font-semibold min-w-[24px]">➂</div>
                                            <p>The widest part of your foot should align with the widest part of the shoe.</p>
                                        </li>
                                        <li className="flex">
                                            <div className="font-semibold min-w-[24px]">➃</div>
                                            <p>Try on shoes in the afternoon or evening when your feet are naturally larger.</p>
                                        </li>
                                        <li className="flex">
                                            <div className="font-semibold min-w-[24px]">➄</div>
                                            <p>If you're between sizes, opt for the larger size.</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Size Charts</h2>

                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-muted-foreground">Select your preferred measurement system:</p>

                            <RadioGroup value={measurementSystem} onValueChange={setMeasurementSystem} className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="us" id="us" />
                                    <Label htmlFor="us">US</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="eu" id="eu" />
                                    <Label htmlFor="eu">EU</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="uk" id="uk" />
                                    <Label htmlFor="uk">UK</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cm" id="cm" />
                                    <Label htmlFor="cm">CM</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Tabs defaultValue="shoes" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="shoes">Running Shoes</TabsTrigger>
                                <TabsTrigger value="apparel">Apparel</TabsTrigger>
                                <TabsTrigger value="accessories">Accessories</TabsTrigger>
                            </TabsList>

                            <TabsContent value="shoes">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold mb-4">Running Shoes Size Chart</h3>

                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-4">{measurementSystem.toUpperCase()}</th>
                                                    <th className="text-left py-3 px-4">Men</th>
                                                    <th className="text-left py-3 px-4">Women</th>
                                                    <th className="text-left py-3 px-4">Foot Length (cm)</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {measurementSystem === 'us' && (
                                                    <>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">5</td><td className="py-2 px-4">-</td><td className="py-2 px-4">5</td><td className="py-2 px-4">22.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">5.5</td><td className="py-2 px-4">-</td><td className="py-2 px-4">5.5</td><td className="py-2 px-4">22.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">6</td><td className="py-2 px-4">6</td><td className="py-2 px-4">6</td><td className="py-2 px-4">23.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">6.5</td><td className="py-2 px-4">6.5</td><td className="py-2 px-4">6.5</td><td className="py-2 px-4">23.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">7</td><td className="py-2 px-4">7</td><td className="py-2 px-4">7</td><td className="py-2 px-4">24.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">7.5</td><td className="py-2 px-4">7.5</td><td className="py-2 px-4">7.5</td><td className="py-2 px-4">24.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">8</td><td className="py-2 px-4">8</td><td className="py-2 px-4">8</td><td className="py-2 px-4">25.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">8.5</td><td className="py-2 px-4">8.5</td><td className="py-2 px-4">8.5</td><td className="py-2 px-4">25.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">9</td><td className="py-2 px-4">9</td><td className="py-2 px-4">9</td><td className="py-2 px-4">26.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">9.5</td><td className="py-2 px-4">9.5</td><td className="py-2 px-4">9.5</td><td className="py-2 px-4">26.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">10</td><td className="py-2 px-4">10</td><td className="py-2 px-4">10</td><td className="py-2 px-4">27.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">10.5</td><td className="py-2 px-4">10.5</td><td className="py-2 px-4">10.5</td><td className="py-2 px-4">27.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">11</td><td className="py-2 px-4">11</td><td className="py-2 px-4">11</td><td className="py-2 px-4">28.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">11.5</td><td className="py-2 px-4">11.5</td><td className="py-2 px-4">-</td><td className="py-2 px-4">28.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">12</td><td className="py-2 px-4">12</td><td className="py-2 px-4">-</td><td className="py-2 px-4">29.0</td></tr>
                                                    </>
                                                )}

                                                {measurementSystem === 'eu' && (
                                                    <>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">35</td><td className="py-2 px-4">-</td><td className="py-2 px-4">5</td><td className="py-2 px-4">22.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">36</td><td className="py-2 px-4">-</td><td className="py-2 px-4">5.5</td><td className="py-2 px-4">22.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">37</td><td className="py-2 px-4">6</td><td className="py-2 px-4">6</td><td className="py-2 px-4">23.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">38</td><td className="py-2 px-4">6.5</td><td className="py-2 px-4">6.5</td><td className="py-2 px-4">23.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">39</td><td className="py-2 px-4">7</td><td className="py-2 px-4">7</td><td className="py-2 px-4">24.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">40</td><td className="py-2 px-4">7.5</td><td className="py-2 px-4">7.5</td><td className="py-2 px-4">24.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">41</td><td className="py-2 px-4">8</td><td className="py-2 px-4">8</td><td className="py-2 px-4">25.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">42</td><td className="py-2 px-4">8.5</td><td className="py-2 px-4">8.5</td><td className="py-2 px-4">25.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">43</td><td className="py-2 px-4">9</td><td className="py-2 px-4">9</td><td className="py-2 px-4">26.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">44</td><td className="py-2 px-4">10</td><td className="py-2 px-4">10</td><td className="py-2 px-4">27.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">45</td><td className="py-2 px-4">11</td><td className="py-2 px-4">11</td><td className="py-2 px-4">28.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">46</td><td className="py-2 px-4">12</td><td className="py-2 px-4">-</td><td className="py-2 px-4">29.0</td></tr>
                                                    </>
                                                )}

                                                {measurementSystem === 'uk' && (
                                                    <>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">3</td><td className="py-2 px-4">-</td><td className="py-2 px-4">5</td><td className="py-2 px-4">22.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">3.5</td><td className="py-2 px-4">-</td><td className="py-2 px-4">5.5</td><td className="py-2 px-4">22.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">4</td><td className="py-2 px-4">6</td><td className="py-2 px-4">6</td><td className="py-2 px-4">23.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">4.5</td><td className="py-2 px-4">6.5</td><td className="py-2 px-4">6.5</td><td className="py-2 px-4">23.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">5</td><td className="py-2 px-4">7</td><td className="py-2 px-4">7</td><td className="py-2 px-4">24.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">5.5</td><td className="py-2 px-4">7.5</td><td className="py-2 px-4">7.5</td><td className="py-2 px-4">24.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">6</td><td className="py-2 px-4">8</td><td className="py-2 px-4">8</td><td className="py-2 px-4">25.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">6.5</td><td className="py-2 px-4">8.5</td><td className="py-2 px-4">8.5</td><td className="py-2 px-4">25.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">7</td><td className="py-2 px-4">9</td><td className="py-2 px-4">9</td><td className="py-2 px-4">26.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">7.5</td><td className="py-2 px-4">9.5</td><td className="py-2 px-4">9.5</td><td className="py-2 px-4">26.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">8</td><td className="py-2 px-4">10</td><td className="py-2 px-4">10</td><td className="py-2 px-4">27.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">9</td><td className="py-2 px-4">11</td><td className="py-2 px-4">11</td><td className="py-2 px-4">28.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">10</td><td className="py-2 px-4">12</td><td className="py-2 px-4">-</td><td className="py-2 px-4">29.0</td></tr>
                                                    </>
                                                )}

                                                {measurementSystem === 'cm' && (
                                                    <>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">22.0</td><td className="py-2 px-4">-</td><td className="py-2 px-4">5</td><td className="py-2 px-4">22.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">22.5</td><td className="py-2 px-4">-</td><td className="py-2 px-4">5.5</td><td className="py-2 px-4">22.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">23.0</td><td className="py-2 px-4">6</td><td className="py-2 px-4">6</td><td className="py-2 px-4">23.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">23.5</td><td className="py-2 px-4">6.5</td><td className="py-2 px-4">6.5</td><td className="py-2 px-4">23.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">24.0</td><td className="py-2 px-4">7</td><td className="py-2 px-4">7</td><td className="py-2 px-4">24.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">24.5</td><td className="py-2 px-4">7.5</td><td className="py-2 px-4">7.5</td><td className="py-2 px-4">24.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">25.0</td><td className="py-2 px-4">8</td><td className="py-2 px-4">8</td><td className="py-2 px-4">25.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">25.5</td><td className="py-2 px-4">8.5</td><td className="py-2 px-4">8.5</td><td className="py-2 px-4">25.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">26.0</td><td className="py-2 px-4">9</td><td className="py-2 px-4">9</td><td className="py-2 px-4">26.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">26.5</td><td className="py-2 px-4">9.5</td><td className="py-2 px-4">9.5</td><td className="py-2 px-4">26.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">27.0</td><td className="py-2 px-4">10</td><td className="py-2 px-4">10</td><td className="py-2 px-4">27.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">27.5</td><td className="py-2 px-4">10.5</td><td className="py-2 px-4">10.5</td><td className="py-2 px-4">27.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">28.0</td><td className="py-2 px-4">11</td><td className="py-2 px-4">11</td><td className="py-2 px-4">28.0</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">29.0</td><td className="py-2 px-4">12</td><td className="py-2 px-4">-</td><td className="py-2 px-4">29.0</td></tr>
                                                    </>
                                                )}
                                                </tbody>
                                            </table>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="font-medium mb-2">Width Guide</h4>
                                            <p className="mb-4">Most running shoes come in standard width (D for men, B for women). Some brands offer multiple width options:</p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                                                    <p className="font-semibold">Narrow (Men: B/Women: A)</p>
                                                </div>
                                                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                                                    <p className="font-semibold">Standard (Men: D/Women: B)</p>
                                                </div>
                                                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                                                    <p className="font-semibold">Wide (Men: 2E/Women: D)</p>
                                                </div>
                                                <div className="text-center p-3 bg-secondary/30 rounded-lg">
                                                    <p className="font-semibold">Extra Wide (Men: 4E)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="apparel">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold mb-4">Apparel Size Chart</h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <h4 className="font-medium mb-2">Men's Apparel</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                        <tr className="border-b">
                                                            <th className="text-left py-3 px-4">Size</th>
                                                            <th className="text-left py-3 px-4">Chest (in)</th>
                                                            <th className="text-left py-3 px-4">Waist (in)</th>
                                                            <th className="text-left py-3 px-4">Hips (in)</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XS</td><td className="py-2 px-4">33-35</td><td className="py-2 px-4">27-29</td><td className="py-2 px-4">33-35</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">S</td><td className="py-2 px-4">36-38</td><td className="py-2 px-4">30-32</td><td className="py-2 px-4">36-38</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">M</td><td className="py-2 px-4">39-41</td><td className="py-2 px-4">33-35</td><td className="py-2 px-4">39-41</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">L</td><td className="py-2 px-4">42-44</td><td className="py-2 px-4">36-38</td><td className="py-2 px-4">42-44</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XL</td><td className="py-2 px-4">45-47</td><td className="py-2 px-4">39-41</td><td className="py-2 px-4">45-47</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XXL</td><td className="py-2 px-4">48-50</td><td className="py-2 px-4">42-44</td><td className="py-2 px-4">48-50</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-medium mb-2">Women's Apparel</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                        <tr className="border-b">
                                                            <th className="text-left py-3 px-4">Size</th>
                                                            <th className="text-left py-3 px-4">Chest (in)</th>
                                                            <th className="text-left py-3 px-4">Waist (in)</th>
                                                            <th className="text-left py-3 px-4">Hips (in)</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XS</td><td className="py-2 px-4">31-33</td><td className="py-2 px-4">24-26</td><td className="py-2 px-4">34-36</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">S</td><td className="py-2 px-4">33-35</td><td className="py-2 px-4">26-28</td><td className="py-2 px-4">36-38</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">M</td><td className="py-2 px-4">35-37</td><td className="py-2 px-4">28-30</td><td className="py-2 px-4">38-40</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">L</td><td className="py-2 px-4">37-39</td><td className="py-2 px-4">30-32</td><td className="py-2 px-4">40-42</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XL</td><td className="py-2 px-4">39-41</td><td className="py-2 px-4">32-34</td><td className="py-2 px-4">42-44</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XXL</td><td className="py-2 px-4">41-43</td><td className="py-2 px-4">34-36</td><td className="py-2 px-4">44-46</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="accessories">
                                <Card>
                                    <CardContent className="pt-6">
                                        <h3 className="text-xl font-semibold mb-4">Accessories Size Guide</h3>

                                        <div className="space-y-8">
                                            <div>
                                                <h4 className="font-medium mb-2">Running Socks</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                        <tr className="border-b">
                                                            <th className="text-left py-3 px-4">Size</th>
                                                            <th className="text-left py-3 px-4">Men's Shoe Size (US)</th>
                                                            <th className="text-left py-3 px-4">Women's Shoe Size (US)</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">S</td><td className="py-2 px-4">3-5</td><td className="py-2 px-4">4-6</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">M</td><td className="py-2 px-4">6-8</td><td className="py-2 px-4">7-9</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">L</td><td className="py-2 px-4">9-11</td><td className="py-2 px-4">10-12</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XL</td><td className="py-2 px-4">12-14</td><td className="py-2 px-4">13+</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-medium mb-2">Headwear</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                        <tr className="border-b">
                                                            <th className="text-left py-3 px-4">Size</th>
                                                            <th className="text-left py-3 px-4">Head Circumference (in)</th>
                                                            <th className="text-left py-3 px-4">Head Circumference (cm)</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">S/M</td><td className="py-2 px-4">21-22.5</td><td className="py-2 px-4">53-57</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">L/XL</td><td className="py-2 px-4">22.5-24</td><td className="py-2 px-4">57-61</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">One Size</td><td className="py-2 px-4">21-23</td><td className="py-2 px-4">53-59</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div>
                                                <h4 className="font-medium mb-2">Gloves</h4>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full border-collapse">
                                                        <thead>
                                                        <tr className="border-b">
                                                            <th className="text-left py-3 px-4">Size</th>
                                                            <th className="text-left py-3 px-4">Hand Circumference (in)</th>
                                                            <th className="text-left py-3 px-4">Hand Length (in)</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XS</td><td className="py-2 px-4">6-6.5</td><td className="py-2 px-4">6-6.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">S</td><td className="py-2 px-4">7-7.5</td><td className="py-2 px-4">6.5-7</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">M</td><td className="py-2 px-4">8-8.5</td><td className="py-2 px-4">7-7.5</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">L</td><td className="py-2 px-4">9-9.5</td><td className="py-2 px-4">7.5-8</td></tr>
                                                        <tr className="border-b"><td className="py-2 px-4 font-medium">XL</td><td className="py-2 px-4">10-10.5</td><td className="py-2 px-4">8-8.5</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Brand-Specific Sizing</h2>
                        <Card>
                            <CardContent className="pt-6">
                                <p className="mb-4">Different brands may have slightly different sizing. Here are some brand-specific tips:</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 border rounded-lg">
                                        <h3 className="font-medium mb-2">Nike</h3>
                                        <p>Tends to run narrow. Consider going up a half size, especially for running shoes.</p>
                                    </div>

                                    <div className="p-4 border rounded-lg">
                                        <h3 className="font-medium mb-2">Adidas</h3>
                                        <p>Generally true to size for running shoes, but lifestyle shoes may run large.</p>
                                    </div>

                                    <div className="p-4 border rounded-lg">
                                        <h3 className="font-medium mb-2">ASICS</h3>
                                        <p>Usually true to size with good width options. Some models may require a half size up.</p>
                                    </div>

                                    <div className="p-4 border rounded-lg">
                                        <h3 className="font-medium mb-2">Brooks</h3>
                                        <p>Typically true to size with a generous toe box. Offers multiple width options.</p>
                                    </div>

                                    <div className="p-4 border rounded-lg">
                                        <h3 className="font-medium mb-2">New Balance</h3>
                                        <p>Known for width options and accommodating fit. Usually true to size.</p>
                                    </div>

                                    <div className="p-4 border rounded-lg">
                                        <h3 className="font-medium mb-2">Hoka</h3>
                                        <p>May run a half size small. Consider sizing up for more room in the toe box.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="bg-secondary/30 p-6 rounded-lg text-center">
                        <h2 className="text-xl font-semibold mb-2">Still Not Sure About Your Size?</h2>
                        <p className="mb-4">Our team of running experts is available to help you find the perfect fit for your needs.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button>Contact Us</Button>
                            <Button variant="outline">Chat with an Expert</Button>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default SizeGuide;